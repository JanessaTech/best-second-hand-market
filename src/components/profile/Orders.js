import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import ProfileFilterBar from './ProfileFilterBar'
import {GlobalVariables} from '../MainLayout'
import logger from '../../common/Logger'
import {capitalize} from '../../utils/StringUtils'
import {getFilter} from '../../utils/LocalStorage'
import {order as orderClient} from '../../utils/serverClient'
import catchAsync from '../../utils/CatchAsync'

function createData(id, title, img, network, category, price, orderedTime, seller) {
  return {
    id,
    title,
    img, 
    network, 
    category,
    price,
    orderedTime,
    seller
  };
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'pets', 12, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'pets', 22, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(3, 'Frozen yoghurt', 'mk.png', 'ethereum', 'pets', 32, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(4, 'Gingerbread', 'mk.png', 'ethereum', 'pets', 42, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(5, 'Honeycomb', 'mk.png', 'ethereum', 'pets', 52, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(6, 'Ice cream sandwich', 'mk.png', 'ethereum', 'pets', 62, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(7, 'Jelly Bean', 'mk.png', 'ethereum', 'pets', 72, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(8, 'KitKat', 'mk.png', 'ethereum', 'pets', 82, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(9, 'Lollipop', 'mk.png', 'ethereum', 'pets', 92, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(10, 'Marshmallow', 'mk.png', 'ethereum', 'pets', 122, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(11, 'Nougat', 'mk.png', 'ethereum', 'pets', 222, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(12, 'Jeniffer', 'mk.png', 'ethereum', 'pets', 342, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(13, 'Lidanaa', 'mk.png', 'ethereum', 'pets', 442, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(14, 'Test for this one', 'mk.png', 'ethereum', 'pets', 62, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(15, 'Day dream for success', 'mk.png', 'ethereum', 'pets', 772, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(16, 'Day dream for success2', 'mk.png', 'ethereum', 'pets', 772, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
]

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
    id: 'createdAt',
    position: 'left',
    disablePadding: false,
    label: 'Created time',
  },
  {
    id: 'from',
    position: 'left',
    disablePadding: false,
    label: 'From',
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
            headCells.map((headCell) => (
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
              ))
          }
        </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function Orders() {
  logger.debug('[Orders] rendering...')
  const {wallet, menuOpen, eventsBus, toggleMenu, trigger, notifyAlertUpdate, notifyFilterUpdate, notifyShowMenu} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('createdAt')
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
        logger.debug('[Orders] call restful api to get the new list of nfts by latestFilter for user', wallet?.user?.id)
        const latestFilter = getFilter()
        const newPageSize = pageSize ? pageSize : pagination.pageSize
        logger.debug('[Orders] latestFilter=', latestFilter)
        logger.debug('[Orders] toPage =', toPage)
        logger.debug('[Orders] newPageSize =', newPageSize)
        const chainId = latestFilter?.chainId
        const category = latestFilter?.categories
        const prices = latestFilter?.prices
        const res = await orderClient.queryOrdersByUserId(wallet?.user?.id, toPage + 1, newPageSize, `${orderBy}:${order}`, chainId, category, prices)
        const {orders, totalPages, totalResults} = res
        logger.debug('[Orders] page=', toPage + 1, ' limit =', newPageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
        setPageNfts(orders)
        setPagination({...pagination, pageSize: newPageSize, page: toPage, pages: totalPages, total: totalResults})
      }
    }, notifyAlertUpdate)
  }

  useEffect(() => {
    (async () => {
      if (wallet?.user) {
        logger.debug('[Orders] add handleFilterUpdate to eventsBus')
        eventsBus.handleFilterUpdate = handleFilterUpdate
        const toPage = pagination.page
        const pageSize = pagination.pageSize
        await fetchData(toPage, pageSize, orderBy, order)
      }
    })()
    // if (wallet?.user) {
    //   logger.debug('[Orders] call restful api to get the new list of orders by user id=', wallet?.user?.id)
    //   const latestFilter = getFilter()
    //   logger.debug('[Orders] trigger=', trigger)
    //   logger.debug('[Orders] latestFilter=', latestFilter)
    //   logger.debug('[Orders] page=', 1)
    //   setRowStates(rows)
    // }
    logger.debug('[Orders] call notifyShowMenu in useEffect')
    notifyShowMenu()
  }, [wallet, trigger])

  const handleFilterUpdate = async () => {
    logger.debug('[Orders] handleFilterUpdate')
    const toPage = 0
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, orderBy, order)
  }

  const handleRequestSort = async (event, newOrderBy) => {
    logger.debug('[Orders] handleRequestSort. newOrderBy =', newOrderBy)
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.debug('newOrder = ', newOrder, 'newOrderBy = ', newOrderBy)

    const toPage = pagination.page
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, newOrderBy, newOrder)

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  };

  const handleChangePage = async (event, newPage) => {
    logger.debug('[Favorites] handleChangePage. newPage =', newPage)
    const toPage = newPage
    const pageSize = pagination.pageSize
    await fetchData(toPage, pageSize, orderBy, order)
  };

  const handleChangeRowsPerPage = async (event) => {
    const toPage = 0
    const pageSize = parseInt(event.target.value, 10)
    await fetchData(toPage, pageSize, orderBy, order)
  };

  // const visibleRows = React.useMemo(
  //   () => {
  //     return rowStates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //   }, [order, orderBy, page, rowsPerPage, rowStates]
  // )

  

  const handleSummary = () => {
    const total = pagination.total
    return (
      <Box>
            <Typography ><strong>{total}</strong> items ordered</Typography>
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
                aria-labelledby="My nft list"
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
                      const labelId = `nft-list-table-index-${index}`
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
                            <Link component={RouterLink} to={`/nft?id=${row.nftId}`}>
                                <Box sx={{display:'flex'}}>
                                    <Box
                                      component='img'
                                      sx={{width: 70, borderRadius:2, height:70, mr:1}}
                                      alt={row.title}
                                      src={row.url}
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
                          <TableCell align="left" sx={{px:1}}>{row.createdAt}</TableCell>
                          <TableCell align="left" sx={{px:1}}>{row.from}</TableCell>
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

