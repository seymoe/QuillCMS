import siteConf from '../config/index.default'

export const log = siteConf.dev ? console.log.bind(console) : () => {}