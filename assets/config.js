/* JobsPulse launch switches — the ONE place to flip at go-live (docs/LAUNCH-PLAN-2026-10.md).
 *   openSignup: true  → landing shows "Get started" (straight to /join/) instead of the
 *                       invitation request; needs the intake secret OPEN_SIGNUP=1 as well.
 *   billing:    true  → pricing / dashboard show the real Upgrade button (Stripe live);
 *                       false keeps "coming soon".
 *   terms:      true  → signup asks "I'm 16+ and accept the Terms" (needs /terms/ published and the
 *                       intake secret TERMS_VERSION, e.g. 2026-11-01).
 *   turnstile:  Cloudflare Turnstile SITE key (public) → bot check on signup, waitlist, feedback and
 *                       the sign-in email (assets/guard.js). Set together with the TURNSTILE_SECRET
 *                       function secret and Supabase Auth captcha (docs/SETUP-GUIDE-ALBERT.md §4).
 *   price / yearly: shown on the pricing page + dashboard (VAT included); the charged amounts are
 *                       the Stripe Prices (secrets STRIPE_PRICE_ID / STRIPE_PRICE_ID_YEARLY).
 */
window.JP_CONFIG = { openSignup: false, billing: false, terms: false, turnstile: "0x4AAAAAAFmxK-VsujJ-VvxN", price: "3,99", yearly: "39", kits: 12 };
