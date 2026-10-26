/* JobsPulse bot check — Cloudflare Turnstile, ON only when assets/config.js has a site key
 * (JP_CONFIG.turnstile). Usually invisible ("interaction-only"): a box appears only when Cloudflare
 * wants a click. Usage:
 *   var g = jpGuard.mount(element);          // render once, near the submit button
 *   fd.append('captcha', await g.token());   // on submit ('' when off)
 *   g.reset();                               // after a submit — tokens are single-use
 * The server side (_shared/guard.ts) checks it once the TURNSTILE_SECRET secret is set.
 */
(function () {
  var loading = null;
  function siteKey() { return (window.JP_CONFIG && window.JP_CONFIG.turnstile) || ''; }
  function load() {
    if (loading) return loading;
    loading = new Promise(function (res, rej) {
      if (window.turnstile) return res(window.turnstile);
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true; s.onload = function () { res(window.turnstile); }; s.onerror = rej;
      document.head.appendChild(s);
    });
    return loading;
  }
  var OFF = { on: false, token: function () { return Promise.resolve(''); }, reset: function () {} };
  window.jpGuard = {
    on: function () { return !!siteKey(); },
    mount: function (el) {
      if (!siteKey() || !el) return OFF;
      var token = '', waiters = [], id = null;
      var lang = (document.documentElement.lang || 'auto').slice(0, 2);
      load().then(function (t) {
        id = t.render(el, {
          sitekey: siteKey(), appearance: 'interaction-only', language: lang || 'auto',
          callback: function (v) { token = v; waiters.splice(0).forEach(function (w) { w(v); }); },
          'expired-callback': function () { token = ''; t.reset(id); },
          'error-callback': function () { token = ''; }
        });
      }).catch(function () {});
      return {
        on: true,
        // waits up to 10 s for Cloudflare (a slow network or an interactive check)
        token: function () {
          if (token) return Promise.resolve(token);
          return new Promise(function (res) { waiters.push(res); setTimeout(function () { res(token); }, 10000); });
        },
        reset: function () { token = ''; if (window.turnstile && id != null) window.turnstile.reset(id); }
      };
    }
  };
})();
