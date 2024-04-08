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

        this.#notifyMap.set('notifyWalletNetworkChangeDone', (props) => {
            logger.debug('[NotificationCenter] notifyWalletNetworkChangeDone', this.eventsBus)
            if (this.eventsBus?.handleNetworkChangeDone) {
                this.eventsBus.handleNetworkChangeDone(props)
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

        this.#notifyMap.set('notityBuyCall', async (buyData) => {
            logger.debug('[NotificationCenter] notityBuyCall', this.eventsBus)
            if (this.eventsBus?.handleBuyCall) {
                try {
                    await this.eventsBus?.handleBuyCall(buyData)
                    this.call('notifyBuyDone', {success: true})
                } catch (err) {
                    const errMsg = err?.info?.error?.message || err?.message
                    this.call('notifyBuyDone', {success: false, reason: errMsg})
                    logger.error('[NotificationCenter] Failed to call buy due to ', err)
                }
            }
        })

        this.#notifyMap.set('notifyBuyDone', (props) => {
            logger.debug('[NotificationCenter] notifyBuyDone', this.eventsBus)
            if (this.eventsBus?.handleBuyDone) {
                this.eventsBus?.handleBuyDone(props)
            } 
        })

        this.#notifyMap.set('notifyNetworkChangeCheck', async (chainId) => {
            logger.debug('[NotificationCenter] notifyNetworkChangeCheck', this.eventsBus)
            if (this.eventsBus.handleNetworkChangeCheck) {
                this.eventsBus.handleNetworkChangeCheck(chainId)
            }
        })

        this.#notifyMap.set('notifyWalletBalance', async () => {
            logger.debug('[NotificationCenter] notifyWalletBalance', this.eventsBus)
            if (this.eventsBus.handleWalletBalance) {
                const walletBalance = this.eventsBus.handleWalletBalance()
                return walletBalance
            }
        })

        this.#notifyMap.set('notify_erc20_balanceOf', async () => {
            logger.debug('[NotificationCenter] notify_erc20_balanceOf', this.eventsBus)
            if (this.eventsBus?.handle_erc20_balanceOf) {
                const balance = await this.eventsBus?.handle_erc20_balanceOf()
                return balance
                
            }
        })

        this.#notifyMap.set('notify_erc20_mint', async (value) => {
            logger.debug('[NotificationCenter] notify_erc20_mint', this.eventsBus)
            if (this.eventsBus?.handle_erc20_mint) {
                await this.eventsBus?.handle_erc20_mint(value)
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

    async asyncCall(name, ...params) {
        if (this.#notifyMap.get(name)) {
            const fn = this.#notifyMap.get(name)
            if (params && params.length > 0) {
                return await fn(...params)
            } else {
                return await fn()
            }
        }
    }

}

const notificationCenter = new NotificationCenter()

export default notificationCenter