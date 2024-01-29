import dev from './dev'
import stage from './stage'
import prod from './prod'

const config = { dev, stage, prod }[process.env.REACT_APP_ENV]

export default config