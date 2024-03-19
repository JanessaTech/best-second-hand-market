import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import logger from '../../common/Logger'
import {GlobalVariables} from '../MainLayout'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import ProfileFilterBar from '../profile/ProfileFilterBar'
import { useSearchParams } from 'react-router-dom'
import {capitalize} from '../../utils/StringUtils'
import {Link as RouterLink } from "react-router-dom"
import catchAsync from '../../utils/CatchAsync'
import {nft as nftClient} from '../../utils/serverClient'
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
    position: 'left',
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

function getFilter() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    return JSON.parse(filter)
  }
  return {}
}

export default function NFTer() {
  logger.debug('[NFTer] rendering...')
  const {menuOpen, toggleMenu, trigger, eventsBus, notifyAlertUpdate, notifyFilterUpdate, notifyShowMenu} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('price')
  const [pageNfts, setPageNfts] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,  // the index of the current page
    pageSize: 5, // how many items are shown in one page
    pages: 0, // how many pages in total
    total: 0 // how many items in total
  })

  const fetchData = async (toPage, orderBy, order) => {
    await catchAsync(async () => {
      if (id) {
        logger.debug('[NFTer] call restful api to get the new list of nfts by latestFilter for user', id)
        const latestFilter = getFilter()
        logger.debug('[NFTer] latestFilter=', latestFilter)
        logger.debug('[NFTer] toPage =', toPage)
        const chainId = latestFilter?.chainId
        const status = config.NFTSTATUS.On.description
        const category = latestFilter?.categories
        const prices = latestFilter?.prices
        const res = await nftClient.queryNFTsForUser(id, toPage + 1, pagination.pageSize, `${orderBy}:${order}`, chainId, status, category, prices)
        const {nfts, totalPages, totalResults} = res
        logger.debug('[NFTer] page=', toPage + 1, ' limit =', pagination.pageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
        setPageNfts(nfts)
        setPagination({...pagination, page: toPage, pages: totalPages, total: totalResults})
      }
    }, notifyAlertUpdate)
  }

  useEffect(() => {
    (async () => {
      logger.debug('[NFTer] add handleFilterUpdate to eventsBus')
      eventsBus.handleFilterUpdate = handleFilterUpdate
      if (id) {
        const toPage = pagination.page
        await fetchData(toPage, orderBy, order)
      }
    })()
    /*
    if (id) {
      logger.debug('[NFTer] call restful api to get the new list of nfts by nfter id=', id)
      const latestFilter = getFilter()
      logger.debug('[NFTer] trigger=', trigger)
      logger.debug('[NFTer] latestFilter=', latestFilter)
      logger.debug('[NFTer] page=', 1)
      setRowSates(rows)
    }*/
    logger.debug('[NFTer] call notifyShowMenu in useEffect')
    notifyShowMenu()
  }, [])

  const handleFilterUpdate = async () => {
    logger.debug('[NFTer] handleFilterUpdate')
    const toPage = 0
    await fetchData(toPage, orderBy, order)
  }

  const handleRequestSort = async (event, newOrderBy) => {
    logger.debug('[MyNFTList] handleRequestSort. newOrderBy =', newOrderBy)
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.debug('newOrder = ', newOrder, 'newOrderBy = ', newOrderBy)
    const toPage = pagination.page
    logger.debug('[MyNFTList] handleRequestSort toPage=', toPage)
    await fetchData(toPage, newOrderBy, newOrder)
    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleChangeRowsPerPage = async (event) => {
    logger.debug('[MyNFTList] handleChangeRowsPerPage.')
    const toPage = 0
    await fetchData(toPage, orderBy, order)
  }

  const handleChangePage = async (event, newPage) => {
    logger.debug('[MyNFTList] handleChangePage. newPage =', newPage)
    const toPage = newPage
    await fetchData(toPage, orderBy, order)
  }

  // const visibleRows = React.useMemo(
  //   () => {
  //     return rowStates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //   }, [order, orderBy, page, rowsPerPage, rowStates]
  // )

  const handleSummary = () => {
    const total = pagination.total
    return (
      <Box>
              <Typography><strong>{total}</strong> items</Typography>
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
                    aria-labelledby="user nft list"
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
                          const labelId = `user-nft-list-table-index-${index}`
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
                                                <Box component='img' sx={{width:15, mr:1}} src={`/imgs/networks/${row.chainName}.svg`}/>
                                            </Box>
                                        </Box>
                                    </Link>
                                </TableCell>
                                <TableCell align="left" sx={{px:1}}>{capitalize(row.category)}</TableCell>
                                <TableCell align="left" sx={{px:1}}>{row.price}</TableCell>
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

