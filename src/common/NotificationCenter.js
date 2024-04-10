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
                for (const [, value] of this.eventsBus.overview ) {
                    if (value?.handleNFTCartStatus) {
                        value?.handleNFTCartStatus(userId, nftIds, isInCart)
                    }
                }
            }
        })

        this.#notifyMap.set('notifyDisableBuyCart', (nftIds) => {
            logger.debug('[NotificationCenter] notifyDisableBuyCart =',  this.eventsBus)
            if (this.eventsBus.handleDisableBuyCart) {
                this.eventsBus.handleDisableBuyCart(nftIds)
            }
            if (this.eventsBus.overview) {
                for (const [, value] of this.eventsBus.overview ) {
                    if (value?.handleDisableBuyCart) {
                        value?.handleDisableBuyCart(nftIds)
                    }
                }
            }
        })


        this.#notifyMap.set('notifyWalletNetworkChangeDone', (props) => {
            logger.debug('[NotificationCenter] notifyWalletNetworkChangeDone', this.eventsBus)
            if (this.eventsBus?.handleNetworkChangeDone) {
                this.eventsBus.handleNetworkChangeDone(props)
            }
        })

        this.#notifyMap.set('notity_erc1115_mint', async (mintData) => {
            logger.debug('[NotificationCenter] notity_erc1115_mint', this.eventsBus)
            if (this.eventsBus?.handle_erc1115_mint) {
                await this.eventsBus?.handle_erc1115_mint(mintData)
            }
        })

        this.#notifyMap.set('notity_erc1115_buy', async (buyData) => {
            logger.debug('[NotificationCenter] notity_erc1115_buy', this.eventsBus)
            if (this.eventsBus?.handle_erc1115_buy) {
                await this.eventsBus?.handle_erc1115_buy(buyData)
            }
        })

        this.#notifyMap.set('notity_erc1115_buyBatch', async (buyData) => {
            logger.debug('[NotificationCenter] notity_erc1115_buyBatch', this.eventsBus)
            if (this.eventsBus?.handle_erc1115_buyBatch) {
                await this.eventsBus?.handle_erc1115_buyBatch(buyData)
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

        this.#notifyMap.set('notity_erc20_transferInBatch', async (transferData) => {
            logger.debug('[NotificationCenter] notity_erc20_transferInBatch', this.eventsBus)
            if (this.eventsBus?.handle_erc20_transferInBatch) {
                await this.eventsBus?.handle_erc20_transferInBatch(transferData)
            }
        })

    }

    call(name, ...params) {
        if (this.#notifyMap.get(name)) {
            const fn = this.#notifyMap.get(name)
            if (params && params.length > 0) {
                return fn(...params)
            } else {
                return fn()
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