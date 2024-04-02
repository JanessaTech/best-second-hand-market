import logger from "./Logger"

class NotificationCenter {
    #notifyMap = new Map()
    eventsBus = {}

    constructor() {
        this.#init()
    }

    // add notifies
    #init() {
        this.#notifyMap.set('notifyFilterUpdate', async () => {
            logger.debug('[NotificationCenter] notifyFilterUpdate', this.eventsBus)
            if (this.eventsBus?.handleFilterUpdate) {
                try {
                    await this.eventsBus.handleFilterUpdate()
                } catch (err) {
                    logger.error('Failed to handleFilterUpdate due to ', err)
                }
            }})
        
        this.#notifyMap.set('notifyFilterMenuReset', () => {
            logger.debug('[NotificationCenter] notifyFilterMenuReset', this.eventsBus)
            if (this.eventsBus?.handleNetworkFilterReset){
                this.eventsBus.handleNetworkFilterReset()
            }
            if (this.eventsBus?.handleCategoryFilterReset){
                this.eventsBus.handleCategoryFilterReset()
            }
            if (this.eventsBus?.handlePriceFilterReset) {
                this.eventsBus.handlePriceFilterReset()
            }
            if (this.eventsBus?.handleSortByReset) {
                this.eventsBus.handleSortByReset()
            }
        })

        this.#notifyMap.set('notifyNFTCartStatusUpdate', (userId, nftIds, isInCart) => {
            logger.debug('[NotificationCenter] notifyNFTCartStatusUpdate =',  this.eventsBus)
            if (this.eventsBus.handleNFTCartStatus) {
                this.eventsBus.handleNFTCartStatus(userId, nftIds, isInCart)
            }
            if (this.eventsBus.overview) {
                for (const [, fn] of this.eventsBus.overview ) {
                    fn(userId, nftIds, isInCart)
                }
            }
        })  
    }

    call(name, ...params) {
        if (this.#notifyMap.get(name)) {
            const fn = this.#notifyMap.get(name)
            if (params && params.length > 0) {
                fn(...params)
            } else {
                fn()
            }
        }
    }

}

const notificationCenter = new NotificationCenter()

export default notificationCenter