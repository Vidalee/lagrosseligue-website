module.exports = {
  ssr: true,

  /*
  ** Headers of the page
  */

  config: {
    devtools: true
  },
  head: {
    title: 'La Grosse Ligue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'La Grosse Ligue statistics'
      }
    ],
    script: [
      {
        src: '/fa.js'
      },
      {
        src: '/navbar.js'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#8c67ef', continuous: true },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    //'@nuxtjs/gtm',
    'lodash',
    [
      'nuxt-cookie-control',
      {
        // barPosition: 'bottom-right',
        colors: {
          barBackground: '#0d0f16',
          modalButtonBackground: '#0d0f16',
          checkboxActiveBackground: '#0d0f16',
          checkboxInactiveBackground: '#ddd',
          controlButtonIconHoverColor: '#fff',
          controlButtonHoverBackground: '#0d0f16',
          controlButtonIconColor: '#0d0f16',
          controlButtonBackground: '#fff'
        },
        text: {
          barTitle: 'Cookies',
          barDescription:
            'Notre site utilise des cookies de site tiers pour améliorer votre experience de navigation. Si vous continuez votre navigation nous considérons que vous les acceptez.',
          acceptAll: 'Accepter',
          declineAll: 'Refuser tout',
          manageCookies: 'Gérer les cookies',
          unsaved: 'Vos paramètres ne sont pas sauvegardés',
          close: 'Fermer',
          save: 'Sauvegarder',
          necessary: 'Cookies nécessaires',
          optional: 'Cookies optionnels',
          functional: 'Cookies fonctionnels',
          blockedIframe:
            'Activez les cookies fonctionnels pour voir ce contenu',
          here: 'ici'
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:3001/'
    // See https://github.com/nuxt-community/axios-module#options
  },
  env: {
    filtering: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (false && ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  cookies: {
    necessary: [
      {
        name: 'Cookies par défaut',
        description: 'Utilisés pour se souvenir des préférences de cookies.',
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies']
      }
    ],
    optional: [
      {
        name: 'Google Analytics',
        identifier: 'ga',
        // else
        description:
          "Google Analytics nous permet d'analyser le trafic sur notre site, les données récoltées sont anonymisées.",

        initialState: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-46750429-8',
        async: true,
        cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())

          gtag('config', 'UA-46750429-8')
        },
        declined: () => {}
      }
    ]
  }
}
