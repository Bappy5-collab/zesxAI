import * as migration_20260924_153713_initial from './20260924_153713_initial';
import * as migration_20260924_154339_intro_listings_social from './20260924_154339_intro_listings_social';
import * as migration_20260924_155229_review_platforms from './20260924_155229_review_platforms';
import * as migration_20260924_160331_intro_thumbnail from './20260924_160331_intro_thumbnail';
import * as migration_20260924_161038_pricing_page from './20260924_161038_pricing_page';
import * as migration_20260924_161612_pricing_copy from './20260924_161612_pricing_copy';
import * as migration_20260924_162236_about_team from './20260924_162236_about_team';
import * as migration_20260924_163347_seo_cms from './20260924_163347_seo_cms';
import * as migration_20260924_164359_pricing_switcher from './20260924_164359_pricing_switcher';
import * as migration_20260924_192111_logo_light from './20260924_192111_logo_light';
import * as migration_20260924_193056_contact_book from './20260924_193056_contact_book';
import * as migration_20260925_090552_services_image from './20260925_090552_services_image';

export const migrations = [
  {
    up: migration_20260924_153713_initial.up,
    down: migration_20260924_153713_initial.down,
    name: '20260924_153713_initial',
  },
  {
    up: migration_20260924_154339_intro_listings_social.up,
    down: migration_20260924_154339_intro_listings_social.down,
    name: '20260924_154339_intro_listings_social',
  },
  {
    up: migration_20260924_155229_review_platforms.up,
    down: migration_20260924_155229_review_platforms.down,
    name: '20260924_155229_review_platforms',
  },
  {
    up: migration_20260924_160331_intro_thumbnail.up,
    down: migration_20260924_160331_intro_thumbnail.down,
    name: '20260924_160331_intro_thumbnail',
  },
  {
    up: migration_20260924_161038_pricing_page.up,
    down: migration_20260924_161038_pricing_page.down,
    name: '20260924_161038_pricing_page',
  },
  {
    up: migration_20260924_161612_pricing_copy.up,
    down: migration_20260924_161612_pricing_copy.down,
    name: '20260924_161612_pricing_copy',
  },
  {
    up: migration_20260924_162236_about_team.up,
    down: migration_20260924_162236_about_team.down,
    name: '20260924_162236_about_team',
  },
  {
    up: migration_20260924_163347_seo_cms.up,
    down: migration_20260924_163347_seo_cms.down,
    name: '20260924_163347_seo_cms',
  },
  {
    up: migration_20260924_164359_pricing_switcher.up,
    down: migration_20260924_164359_pricing_switcher.down,
    name: '20260924_164359_pricing_switcher',
  },
  {
    up: migration_20260924_192111_logo_light.up,
    down: migration_20260924_192111_logo_light.down,
    name: '20260924_192111_logo_light',
  },
  {
    up: migration_20260924_193056_contact_book.up,
    down: migration_20260924_193056_contact_book.down,
    name: '20260924_193056_contact_book',
  },
  {
    up: migration_20260925_090552_services_image.up,
    down: migration_20260925_090552_services_image.down,
    name: '20260925_090552_services_image'
  },
];
