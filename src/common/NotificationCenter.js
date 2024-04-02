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

        this.#notifyMap.set('notifyWalletNetworkChangeDone', () => {
            logger.debug('[NotificationCenter] notifyWalletNetworkChangeDone', this.eventsBus)
            if (this.eventsBus?.handleNetworkChangeDone) {
                this.eventsBus.handleNetworkChangeDone()
            }
        })

        this.#notifyMap.set('notityMintCall', async (mintData) => {
            logger.debug('[NotificationCenter] notityMintCall', this.eventsBus)
            if (this.eventsBus?.handleMintCall) {
                try {
                    await this.eventsBus?.handleMintCall(mintData)
                    this.call('notifyMintDone', {success: true})
                } catch (err) {
                    const errMsg = err?.info?.error?.message || err?.message
                    this.call('notifyMintDone', {success: false, reason: errMsg})
                    logger.error('[NotificationCenter] Failed to call mint due to ', err)
                }
            }
        })

        this.#notifyMap.set('notifyMintDone', (props) => {
            logger.debug('[NotificationCenter] notifyMintDone', this.eventsBus)
            if (this.eventsBus?.handleMintDone) {
                this.eventsBus?.handleMintDone(props)
            } 
        })

        this.#notifyMap.set('notifyNetworkChangeCheck', async (chainId, nftIds, prices) => {
            logger.debug('[NotificationCenter] notifyNetworkChangeCheck', this.eventsBus)
            if (this.eventsBus.handleNetworkChangeCheck) {
                this.eventsBus.handleNetworkChangeCheck(chainId, nftIds, prices)
            }
        })

        /*
        const notifyNetworkCheckAndBuy = async (chainId, nftIds, prices) => {
            logger.debug('[MainLayout] notifyNetworkCheckAndBuy', eventsBus)
            if (eventsBus.networkCheckAndBuy) {
                eventsBus.networkCheckAndBuy(chainId, nftIds, prices)
            }
        }*/
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

    async asyncCall(name, ...params) {
        if (this.#notifyMap.get(name)) {
            const fn = this.#notifyMap.get(name)
            if (params && params.length > 0) {
                await fn(...params)
            } else {
                await fn()
            }
        }
    }

}

const notificationCenter = new NotificationCenter()

export default notificationCenter