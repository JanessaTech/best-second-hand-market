export default {
    //metamask
    metamask_get_logined_user_success: '[{0}] Got a logined user by address {1} loginedUser = {2}',
    metamask_user_not_found: '[{0}]] User is not found by address {1} is found. Navigate to signup page',
    // user api
    user_failed_findby_address: 'Failed to find an user by address {0} due to {1}',
    user_failed_register: 'Failed to register the user {0} due to {1}',
    user_failed_login: 'Failed to logout by address {0} due to {1}',
    user_failed_logout: 'Failed to logout by address {0} due to {1}',
    user_failed_update: 'Failed to update the user {0} due to {1}',
    user_failed_overview: 'Failed to get overview for the user {0} due to {1}',
    //nft
    nft_failed_mint: 'Failed to save a record for the newly created nft {0} due to {1}. Please ask admin for help',
    nft_success_mint : 'A new NFT is minted successfully',
    nft_failed_findby_id: 'Failed to find the NFT by id {0}',
    nft_failed_query_all: 'Failed to query all NFTs for user(id={0}) with pageQuery {1} due to {2}',
    nft_failed_queryfor_user: 'Failed to query NFTs for user(id={0}) with pageQuery {1} due to {2}',
    nft_failed_favorite_queryfor_user: 'Failed to query favorite NFTs for user(id={0}) with pageQuery {1} due to {2}',
    nft_failed_update:'Failed to update nft(id={0}) due to {1}',
    //like
    nft_failed_like: 'Failed to like nft(id={0}) by user(id={1}) due to {2}',
    nft_failed_unlike: 'Failed to dislike nft(id={0}) by user(id={1}) due to {2}',
    //cart
    cart_failed_add: 'Failed to add nft(id={0}) to cart by user(id={1}) due to {2}',
    cart_failed_remove: 'Failed to remove cart item by userId {0} and nftId {1} due to {2}',
    cart_failed_isInCart: 'Failed to check if nft(id={0}) is added by user(id={1})\'s cart due to {2}',
    cart_failed_queryby_user: 'Failed to query cart items for user(id={0}) due to {1}',
    //comment
    comment_failed_create: 'Failed to add a new comment {0} due to {1}',
    comment_failed_query: 'Failed to query cart items for nft(id={0}) with query parameters: page = {1}, limit = {2}, sortBy ={3} due to {4}',
}