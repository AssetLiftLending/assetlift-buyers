# AssetLift Buyers

Vercel-ready lead-generation website for AssetLift Buyers, the direct property-buying brand of AssetLift Lending LLC.

## Deploy

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel with the project root set to this folder.
3. Add `RESEND_API_KEY` in Vercel project settings to enable form delivery.
4. In Resend, verify `assetliftlending.com`, then add `LEAD_FROM_EMAIL` in Vercel (for example, `AssetLift Website <website@assetliftlending.com>`).
5. Update every `assetlift-buyers.vercel.app` reference if Vercel assigns a different production URL.

The lead form falls back to a pre-addressed email until Resend is configured.
