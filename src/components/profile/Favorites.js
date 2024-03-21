import { Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'
import { UnavailableHelpTip } from '../../common/TipHelpers'
import logger from '../../common/Logger'
import {getFilter} from '../../utils/LocalStorage'
import catchAsync from '../../utils/CatchAsync'
import {nft as nftClient} from '../../utils/serverClient'
import {like as likeClient} from '../../utils/serverClient'
import config from '../../config'

const headCells = [
  {
    id: 'id',
    position: 'left',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'title',
    position: 'center',
    disablePadding: false,
    label: 'NFT',
  },
  {
    id: 'category',
    position: 'left',
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'price',
    position: 'left',
    disablePadding: false,
    label: 'Price(CH)',
  },
  {
    id: 'view',
    position: 'left',
    disablePadding: false,
    label: 'Views',
  },
  {
    id: 'detete',
    position: 'left',
    disablePadding: false,
    label: 'Detete',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort} = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {
          headCells.map((headCell) => {
            return (
              <TableCell
                      sx={{px:1}}
                      key={headCell.id}
                      align={headCell.position}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}>
                          {headCell.label}
                      </TableSortLabel>
              </TableCell>
            )
          })
        }
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
}

export default function Favorites() {
  logger.debug('[Favorites] rendering...')
  const {wallet, menuOpen, toggleMenu, eventsBus, notifyAlertUpdate, notifyFilterUpdate, notifyShowMenu} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('price')
  const [pageNfts, setPageNfts] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,  // the index of the current page
    pageSize: 5, // how many items are shown in one page
    pages: 0, // how many pages in total
    total: 0 // how many items in total
  })

  const fetchData = async (toPage, pageSize, orderBy, order) => {
    await catchAsync(async () => {
      if (wallet?.user) {
        logger.debug('[NFTer] call restful api to get the new list of nfts by latestFilter for user', wallet?.user?.id)
        const latestFilter = getFilter()
        const newPageSize = pageSize ? pageSize : pagination.pageSize
        logger.debug('[Favorites] latestFilter=', latestFilter)
        logger.debug('[Favorites] toPage =', toPage)
        logger.debug('[Favorites] newPageSize =', newPageSize)
        const chainId = latestFilter?.chainId
        const status = undefined
        const category = latestFilter?.categories
        const prices = latestFilter?.prices
        const res = await nftClient.queryFavoriteNFTsForUser(wallet?.user?.id, toPage + 1, newPageSize, `${orderBy}:${order}`, chainId, status, category, prices)
        const {nfts, totalPages, totalResults} = res
        logger.debug('[Favorites] page=', toPage + 1, ' limit =', newPageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
        setPageNfts(nfts)
        setPagination({...pagination, pageSize: newPageSize, page: toPage, pages: totalPages, total: totalResults})
      }
    }, notifyAlertUpdate)
  }

  useEffect(() => {
    (async () => {
      if (wallet?.user) {
        logger.debug('[Favorites] add handleFilterUpdate to eventsBus')
        eventsBus.handleFilterUpdate = handleFilterUpdate
        const toPage = pagination.page
        const pageSize = pagination.pageSize
        await fetchData(toPage, pageSize, orderBy, order)
      }
    })()
    logger.debug('[Favorites] call notifyShowMenu in useEffect')
    notifyShowMenu()
  }, [wallet])

  const handleFilterUpdate = async () => {
    logger.debug('[Favorites] handleFilterUpdate')
    const toPage = 0
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, orderBy, order)
  }

  const handleRequestSort = async (event, newOrderBy) => {
    logger.debug('[Favorites] handleRequestSort. newOrderBy =', newOrderBy)
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.debug('newOrder = ', newOrder, 'newOrderBy = ', newOrderBy)

    const toPage = pagination.page
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, newOrderBy, newOrder)

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleChangePage = async (event, newPage) => {
    logger.debug('[Favorites] handleChangePage. newPage =', newPage)
    const toPage = newPage
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, orderBy, order)
  }

  const handleChangeRowsPerPage = async (event) => {
    const toPage = 0
    const pageSize = parseInt(event.target.value, 10)
    await fetchData(toPage, pageSize, orderBy, order)
  }

  const handleDelete = (nftId) => async (e) => {
    logger.info('[Favorites] handleDelete nftId=', nftId)
    logger.info('[Favorites] call restful api to delete a favorite by nftId ', nftId, ' for user ', wallet?.user?.id)
    await catchAsync(async () => {
      await likeClient.unlike(wallet?.user?.id, nftId)
      logger.debug('pagination.total = ', pagination.total)
      const lastPage = Math.floor((pagination.total - 2) / pagination.pageSize) // get the last page index after deletion
      logger.debug('lastPage=', lastPage, 'pagination.page=', pagination.page, 'Math.min(lastPage, pagination.page)=', Math.min(lastPage, pagination.page))
      setPageNfts(pageNfts.filter((nft) => nft.id !== nftId))
      setPagination({...pagination, page: Math.min(lastPage, pagination.page), pages: (pagination.total - 1) / pagination.pageSize, total: pagination.total - 1})
    }, notifyAlertUpdate)
  }

  const handleSummary = () => {
    const total = pagination.total
    return (
      <Box>
              <Typography><strong>{total}</strong> items in favorites </Typography>
      </Box>
    )
  }

  return (
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
      <ProfileFilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate} handleSummary={handleSummary}/>
      <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="My favorites list"
                  size={'medium'}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {
                      pageNfts.map((row, index) => {
                        const labelId = `favorite-list-table-index-${index}`
                        return (
                          <TableRow
                            hover
                            key={row.id}
                            sx={{ cursor: 'pointer', px:1}}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              sx={{px:1}}
                            >
                            {row.id}
                            </TableCell>
                            <TableCell align="center" sx={{px:1}}>
                                <Link component={RouterLink} to={`/nft?id=${row.id}`}>
                                    <Box sx={{display:'flex'}}>
                                        <Box
                                          component='img'
                                          sx={{width: 70, borderRadius:2, height:70, mr:1}}
                                          alt={row.title}
                                          src={row?.url}
                                        >
                                        </Box>
                                        <Box sx={{width:100, display:'flex', flexDirection:'column'}}>
                                            <Typography variant='body1' 
                                              sx={{fontWeight:'bold', whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign:'left'}}>{row.title}</Typography>
                                            <Typography variant='body2' 
                                              sx={{whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign:'left'}} color='text.seconadry'>{row.sellerName}</Typography>
                                            <Box component='img' sx={{width:15, mr:1}} src={`/imgs/networks/${row.chainName}.svg`}/>
                                        </Box>
                                    </Box>
                                </Link>
                            </TableCell>
                            <TableCell align="left" sx={{px:1}}>{row.category}</TableCell>
                            <TableCell align="left" sx={{px:1}}>
                            {row?.status === config.NFTSTATUS.On.description ? row.price : <UnavailableHelpTip/>}
                            </TableCell>
                            <TableCell align="left" sx={{px:1}}>{row.view}</TableCell>
                            <TableCell align="left" sx={{px:1}}>
                              <Tooltip title="Delete favorite" placement="right">
                                  <IconButton onClick={handleDelete(row.id)}>
                                      <DeleteIcon />
                                  </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    }
                  </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.total}
                rowsPerPage={pagination.pageSize}
                page={pagination.page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      </Box>

    </Box>
  )
}

