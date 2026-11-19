import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useTranslation } from "react-i18next";
import { useDishTelemetry } from "./hooks/useDishTelemetry";
import { useLanPresence } from "./hooks/useLanPresence";
import { AnimatePresence, motion } from "motion/react";
import { useSatellites } from "./hooks/useSatellites";
import { useObserverLocation } from "./hooks/useObserverLocation";
import { usePanelRouting } from "./hooks/usePanelRouting";
import { useOutageNotifications } from "./hooks/useOutageNotifications";
import { useThermalEvents } from "./hooks/useThermalEvents";
import { useDeviceAlerts } from "./hooks/useDeviceAlerts";
import { useOutageHistory, mergeOutages } from "./hooks/useOutageHistory";
import { useOutageReports } from "./hooks/useOutageReports";
import {
  notificationsOn as readNotificationsOn,
  notificationsBlockedReason as readNotificationsBlockedReason,
  subscribeToNotifications,
  toggleNotifications,
} from "./lib/notifications";
import { armAlertSoundOnFirstGesture } from "./lib/alertSound";
import { TopBar } from "./components/dashboard/TopBar";
import { AppToolbar } from "./components/toolbar/AppToolbar";
import { DashboardView } from "./components/dashboard/DashboardView";
import { windowTail } from "./lib/telemetryWindow";
import { DishTerminalCard } from "./components/dashboard/DishTerminalCard";
import { DetailsModal } from "./components/ui/details-modal";
import { Loading } from "./components/ui/loading";
import { useRouterNetwork } from "./hooks/useRouterNetwork";
import { useRouterUnreachable } from "./hooks/useRouterUnreachable";
import { useLiveReadings } from "./hooks/useLiveReadings";
import { formatThroughput } from "./lib/format";
import { TooltipProvider } from "./components/ui/tooltip";
import { useTheme } from "./hooks/useTheme";
import { dishModelFor } from "./lib/dishMesh";

const SatelliteView = lazy(() =>
  import("./components/satellite/SatelliteView").then(({ SatelliteView }) => ({
    default: SatelliteView,
  })),
);
const SpeedTestPanel = lazy(() =>
  import("./components/speed-test/SpeedTestCard").then(({ SpeedTestPanel }) => ({
    default: SpeedTestPanel,
  })),
);
const AlignmentPanel = lazy(() =>
  import("./components/alignment/AlignmentCard").then(({ AlignmentPanel }) => ({
    default: AlignmentPanel,
  })),
);
const DataUsagePanel = lazy(() =>
  import("./components/data-usage/DataUsagePanel").then(({ DataUsagePanel }) => ({
    default: DataUsagePanel,
  })),
);
const NetworkPanel = lazy(() =>
  import("./components/network/NetworkPanel").then(({ NetworkPanel }) => ({
    default: NetworkPanel,
  })),
);
const AccountPanel = lazy(() =>
  import("./components/account/AccountPanel").then(({ AccountPanel }) => ({
    default: AccountPanel,
  })),
);
const SettingsModal = lazy(() =>
  import("./components/settings/SettingsModal").then(({ SettingsModal }) => ({
    default: SettingsModal,
  })),
);

function PanelLoading() {
  return <Loading className='min-h-48' size={24} />;
}

export default function App() {
  const { t } = useTranslation();
  const { theme, cycleTheme } = useTheme();
  const {
    openPanel,
    setOpenPanel,
    settingsTab,
    skyViewOpen,
    setSkyViewOpen,
    openNav,
    openSkyView,
  } = usePanelRouting();
  const [windowMinutes, setWindowMinutes] = useState(15);
  const [networkDeviceKey, setNetworkDeviceKey] = useState<string | null>(null);
  const openNetworkDevice = useCallback(
    (entryKey: string) => {
      setNetworkDeviceKey(entryKey);
      setOpenPanel("network");
    },
    [setOpenPanel],
  );
  const closeNetworkPanel = useCallback(() => {
    setNetworkDeviceKey(null);
    setOpenPanel(null);
  }, [setOpenPanel]);
  const notificationsOn = useSyncExternalStore(subscribeToNotifications, readNotificationsOn);
  const notificationsBlockedReason = useSyncExternalStore(
    subscribeToNotifications,
    readNotificationsBlockedReason,
  );
  const telemetry = useDishTelemetry();
  const { observerLocation, onLocationSaved, onClearLocation } = useObserverLocation(
    telemetry.dishLocation?.lla,
  );
  const lanOnline = useLanPresence(telemetry.status, telemetry.connectionState);
  const satellites = useSatellites(
    observerLocation,
    telemetry.obstructionMap,
    dishModelFor(telemetry.status),
    telemetry.status?.boresightAzimuthDeg ?? 0,
    skyViewOpen,
  );
  useOutageNotifications(telemetry);
  const deviceAlerts = useDeviceAlerts(telemetry.status, telemetry.connectionState);
  const thermalEvents = useThermalEvents();
  const persistedOutages = useOutageHistory();
  const outageEvents = useMemo(
    () => mergeOutages(telemetry.outageEvents, persistedOutages),
    [telemetry.outageEvents, persistedOutages],
  );
  const outageReports = useOutageReports();
  const routerNetwork = useRouterNetwork(openPanel === "network" || openPanel === "settings");
  const routerUnreachable = useRouterUnreachable(
    routerNetwork.routerReachable,
    telemetry.status,
    telemetry.connectionState === "online",
  );

  useEffect(() => armAlertSoundOnFirstGesture(), []);

  const { status, samples } = telemetry;

  useEffect(() => {
    window.dishlink?.reportThroughput?.(
      status?.downlinkThroughputBps ?? 0,
      status?.uplinkThroughputBps ?? 0,
    );
  }, [status]);

  const {
    nowMs,
    livePowerW,
    powerWindowEndMs,
    averagePowerW,
    recentPingSuccessPercent,
    sparklines,
  } = useLiveReadings(samples);

  const liveDownlink = formatThroughput(status?.downlinkThroughputBps ?? 0);
  const liveUplink = formatThroughput(status?.uplinkThroughputBps ?? 0);
  const chartSamples = useMemo(
    () => windowTail(samples, windowMinutes, nowMs),
    [samples, windowMinutes, nowMs],
  );
  const powerChartSamples = useMemo(
    () => windowTail(samples, windowMinutes, powerWindowEndMs),
    [samples, windowMinutes, powerWindowEndMs],
  );
  return (
    <TooltipProvider delayDuration={200}>
      <AnimatePresence initial={false} mode='wait'>
        {!skyViewOpen && (
          <motion.div
            key='dashboard'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <TopBar
              connectionState={telemetry.connectionState}
              status={status}
              theme={theme}
              onCycleTheme={cycleTheme}
              deviceAlerts={deviceAlerts}
              notificationsOn={notificationsOn}
              notificationsBlockedReason={notificationsBlockedReason}
              onToggleNotifications={() => void toggleNotifications()}
            />
            <AppToolbar activeId={openPanel} onSelect={openNav} />

            <DashboardView
              status={status}
              connectionState={telemetry.connectionState}
              stale={telemetry.stale}
              obstructionMap={telemetry.obstructionMap}
              liveDownlink={liveDownlink}
              liveUplink={liveUplink}
              sparklines={sparklines}
              livePowerW={livePowerW}
              recentPingSuccessPercent={recentPingSuccessPercent}
              windowMinutes={windowMinutes}
              onWindowMinutesChange={setWindowMinutes}
              chartSamples={chartSamples}
              powerChartSamples={powerChartSamples}
              powerWindowEndMs={powerWindowEndMs}
              averagePowerW={averagePowerW}
              outageEvents={outageEvents}
              thermalEvents={thermalEvents}
              reports={outageReports}
              samples={samples}
              onOpenSatelliteView={openSkyView}
              onExpandTerminal={() => setOpenPanel("terminal")}
              onOpenDevice={openNetworkDevice}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal modal */}
      {openPanel === "terminal" && status && (
        <DetailsModal
          title={t("navigation.dishTerminal")}
          onClose={() => setOpenPanel(null)}
          size='xxl'
        >
          <DishTerminalCard status={status} stale={telemetry.stale} expanded />
        </DetailsModal>
      )}
      {/* Speed test modal */}
      {openPanel === "speedtest" && (
        <DetailsModal title={t("navigation.speedTest")} onClose={() => setOpenPanel(null)}>
          <Suspense fallback={<PanelLoading />}>
            <SpeedTestPanel samples={samples} status={status} />
          </Suspense>
        </DetailsModal>
      )}
      {/* Alignment modal */}
      {openPanel === "alignment" && (
        <DetailsModal
          title={t("navigation.alignment")}
          onClose={() => setOpenPanel(null)}
          size='wide'
        >
          <Suspense fallback={<PanelLoading />}>
            <AlignmentPanel
              status={status}
              stale={telemetry.stale}
              lastStatusAtMs={telemetry.lastStatusAtMs}
              onOpenSkyView={openSkyView}
            />
          </Suspense>
        </DetailsModal>
      )}
      {/* Data usage modal */}
      {openPanel === "datausage" && (
        <DetailsModal
          title={t("navigation.dataUsage")}
          onClose={() => setOpenPanel(null)}
          size='wide'
        >
          <Suspense fallback={<PanelLoading />}>
            <DataUsagePanel />
          </Suspense>
        </DetailsModal>
      )}
      {/* Account modal */}
      {openPanel === "account" && (
        <DetailsModal
          title={t("navigation.starlinkAccount")}
          onClose={() => setOpenPanel(null)}
          size='wide'
        >
          <Suspense fallback={<PanelLoading />}>
            <AccountPanel lanOnline={lanOnline} />
          </Suspense>
        </DetailsModal>
      )}
      {/* Network modal */}
      {openPanel === "network" && (
        <Suspense
          fallback={
            <DetailsModal title={t("navigation.network")} onClose={closeNetworkPanel} size='wide'>
              <PanelLoading />
            </DetailsModal>
          }
        >
          <NetworkPanel
            network={routerNetwork}
            unreachable={routerUnreachable}
            initialSelectedKey={networkDeviceKey}
            onClose={closeNetworkPanel}
          />
        </Suspense>
      )}
      {/* Settings modal */}
      {openPanel === "settings" && (
        <Suspense
          fallback={
            <DetailsModal
              title={t("navigation.settings")}
              onClose={() => setOpenPanel(null)}
              size='wide'
            >
              <PanelLoading />
            </DetailsModal>
          }
        >
          <SettingsModal
            onClose={() => setOpenPanel(null)}
            status={status}
            hardwareVersion={
              telemetry.deviceInfo?.hardwareVersion ?? status?.deviceInfo?.hardwareVersion
            }
            wifiConfig={routerNetwork.wifiConfig}
            clients={routerNetwork.clients}
            initialTab={settingsTab}
            routerReachable={routerNetwork.routerReachable}
            routerViaAccount={routerNetwork.wifiConfigViaAccount}
            routerUnreachable={routerUnreachable}
            onRouterConfigChanged={routerNetwork.refreshConfig}
          />
        </Suspense>
      )}
      {/* Sky view (full-viewport) */}
      <AnimatePresence>
        {skyViewOpen && (
          <motion.div
            key='skyview'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Suspense
              fallback={
                <div className='grid min-h-screen place-items-center bg-page'>
                  <Loading size={28} />
                </div>
              }
            >
              <SatelliteView
                obstructionMap={telemetry.obstructionMap}
                obstructionStats={status?.obstructionStats}
                status={status}
                stale={telemetry.stale}
                satellites={satellites}
                observerLocation={observerLocation}
                onLocationSaved={onLocationSaved}
                onClearLocation={onClearLocation}
                onClose={() => setSkyViewOpen(false)}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
