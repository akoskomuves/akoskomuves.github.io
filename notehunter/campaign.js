/* App Store campaign links for NoteHunter. Every link on the site that
   leads to the App Store is built here, so the provider token lives in
   exactly one place.

   PROVIDER_TOKEN: App Store Connect → Apps → NoteHunter → App Analytics →
   Acquisition → Campaigns → "Generate a campaign link" shows it as pt=…
   Until it is filled in, links still open the App Store, they just are
   not counted per campaign. */
var PROVIDER_TOKEN = '120404971';

var NOTEHUNTER_APP_ID = '1584522362';

function notehunterCampaignUrl(campaign) {
    var url = 'https://apps.apple.com/app/apple-store/id' + NOTEHUNTER_APP_ID + '?';
    if (PROVIDER_TOKEN && PROVIDER_TOKEN !== 'PROVIDER_TOKEN') {
        url += 'pt=' + encodeURIComponent(PROVIDER_TOKEN) + '&';
    }
    return url + 'ct=' + encodeURIComponent(campaign) + '&mt=8';
}
