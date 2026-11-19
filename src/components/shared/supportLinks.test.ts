import { describe, expect, it } from "vitest";
import { getUpdateDownloadUrl, SUPPORT_LINKS } from "./supportLinks";

// The expected values are written out in full rather than built from REPO the
// way the source builds them. Sharing that constant would make this pass no
// matter what REPO became — precisely the substitution worth catching. Spelled
// out, changing any link takes a second deliberate edit here.
//
// `toEqual` on the whole object rather than key by key, so a row that appears or
// disappears fails too.
describe("support menu links", () => {
  it("point where they are meant to", () => {
    expect(SUPPORT_LINKS).toEqual({
      starRepo: "https://github.com/DaveyHert/dishylink",
      githubSponsors: "https://github.com/sponsors/daveyhert",
      buyMeACoffee: "https://buymeacoffee.com/daveyhert",
      patreon: "https://www.patreon.com/DaveyHert",
      downloadPage: "https://github.com/lipicero/Dishylink/releases/latest",
      releaseNotes: "https://github.com/lipicero/Dishylink/releases/latest",
      latestRelease: "https://github.com/lipicero/Dishylink/releases/latest",
      reportIssue: "https://github.com/DaveyHert/dishylink/issues/new?labels=bug",
      requestFeature: "https://buymeacoffee.com/daveyhert/e/591024",
      contact: "mailto:hello@dishylink.com",
      x: "https://x.com/daveyhert",
      linkedin: "http://linkedin.com/in/daveyhert/",
      privacyPolicy: "https://github.com/DaveyHert/dishylink/blob/master/PRIVACY.md",
      disclaimer: "https://github.com/DaveyHert/dishylink/blob/master/DISCLAIMER.md",
    });
  });

  it("links to the matching release asset for the current desktop architecture", () => {
    expect(getUpdateDownloadUrl("1.5.0", "win32", "x64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-x64.exe",
    );
    expect(getUpdateDownloadUrl("1.5.0", "win32", "arm64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-arm64.exe",
    );
    expect(getUpdateDownloadUrl("1.5.0", "darwin", "arm64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-arm64.dmg",
    );
    expect(getUpdateDownloadUrl("1.5.0", "darwin", "x64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-x64.dmg",
    );
    expect(getUpdateDownloadUrl("1.5.0", "linux", "x64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/download/v1.5.0/Dishylink-1.5.0-amd64.deb",
    );
  });

  it("falls back to the releases page when there is no matching installer", () => {
    expect(getUpdateDownloadUrl("1.5.0", "linux", "arm64")).toBe(
      "https://github.com/lipicero/Dishylink/releases/latest",
    );
    expect(getUpdateDownloadUrl("1.5.0")).toBe(
      "https://github.com/lipicero/Dishylink/releases/latest",
    );
  });
});
