import type { JipProfile } from "../jip-profile-types";
import staygold from "./staygold.json";
import nishiki from "./nishiki-konjac.json";
import scMeat from "./sc-meat-wagyu.json";
import asahi from "./asahi-seika-karinto.json";
import awayuki from "./awayuki-salt.json";
import tamaya from "./tamaya-heartdance.json";
import goldy from "./goldy-jewelry.json";
import natsuno from "./ginza-natsuno-chopsticks.json";
import thaiNichi from "./thai-nichi-ingredients.json";
import masumura from "./masumura-doll-crafts.json";

const ADDED_ON = "2026-11-15";

/** Every profile in the repo, including drafts awaiting verification. */
export const allJipProfiles: JipProfile[] = (
  [staygold, nishiki, scMeat, asahi, awayuki, tamaya, goldy, natsuno, thaiNichi, masumura] as unknown as JipProfile[]
).map((p) => ({ ...p, addedOn: p.addedOn ?? ADDED_ON }));

const hasRenderableImages = (p: JipProfile) =>
  Boolean(p.images?.hero?.base && p.images?.card?.src);

/** Only fully verified profiles with real image assets are published. */
export const publishedJipProfiles: JipProfile[] = allJipProfiles.filter(
  (p) => p.status === "published" && hasRenderableImages(p)
);

export const draftJipProfiles: JipProfile[] = allJipProfiles.filter(
  (p) => !publishedJipProfiles.includes(p)
);
