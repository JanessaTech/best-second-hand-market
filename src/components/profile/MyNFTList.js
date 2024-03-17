import { Box, Paper, Table, TableCell, TableBody , TableContainer, TableHead, TableRow, useMediaQuery, TableSortLabel, TablePagination, Button, TextField, Typography, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Link as RouterLink } from "react-router-dom"
import { useTheme } from '@mui/material/styles'
import config from '../../config'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'
import PropTypes from 'prop-types'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import {capitalize} from '../../utils/StringUtils'
import {getFilter} from '../../utils/LocalStorage'
import catchAsync from '../../utils/CatchAsync'
import {nft as nftClient} from '../../utils/serverClient'
import {shortFormatDate} from '../../utils/DateUtils'
import { logoutByAddress } from '../../utils/serverClient/user'

function createData(id, title, img, network, category, sstatus, price, createdTime) {
  return {
    id,
    title,
    img, 
    network, 
    category,
    sstatus,
    price,
    createdTime
  };
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'pets', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 61, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 62, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(3, 'green monkey', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 63, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(4, 'Frozen yoghurt', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 64, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(5, 'Gingerbread', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 65, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(6, 'Honeycomb', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 66, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(7, 'Ice cream sandwich', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 67, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(8, 'Jelly Bean', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 68, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(9, 'KitKat', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 69, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(10, 'Lollipop', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 70, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(11, 'Marshmallow', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 71, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(12, 'Nougat', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 72, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(13, 'Oreo', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(14, 'Oreo', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
  createData(15, 'Oreo', 'mk.png', 'ethereum', 'pets', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024'),
]

function EnhancedTableHead(props) {
  const { headCells, order, orderBy, onRequestSort} = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
        <TableRow>
              {
                headCells.map((headCell) => 
                <TableCell
                      sx={{display:headCell.display ? 'table-cell': 'none',px:1, width: headCell.width}}
                      key={headCell.id}
                      align={headCell.position}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        sx={{cursor: headCell.order ? 'pointer': 'default', '& svg':{display: headCell.order ? 'block': 'none'}}}
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={headCell.order ? createSortHandler(headCell.id) : (e)=> {}}>
                          {headCell.label}
                      </TableSortLabel>
                </TableCell>
                )
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

function convertNFTs(nfts) {
  const copies = nfts.map((nft) => {
    const copy = {}
    for (const [key, value] of Object.entries(nft)) {
        if (key === 'price' || key === 'status') {
            copy[key] = {}
            copy[key].isChanged = false
            copy[key].backUpValue = undefined
            copy[key].value = value
        } else if(key === 'createdAt' || key === 'updatedAt') {
          copy[key] = shortFormatDate(new Date(value))
        } else {
            copy[key] = value
        }
    }
    return copy
  })
  return copies
}

export default function MyNFTList() {
  logger.debug('[MyNFTList] rendering....')
  const {wallet, menuOpen, eventsBus, toggleMenu, notifyAlertUpdate, notifyFilterUpdate, notifyShowMenu} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const headCells = [
    {
      id: 'id',
      position: 'left',  // 'inherit' | 'left' | 'center' | 'right' | 'justify'
      disablePadding: false,
      label: 'ID',
      order: true,  // Indicate if this column is orderable
      display: true  // Indicate if this column is visible
    },
    {
      id: 'title',
      position: 'center',
      disablePadding: false,
      label: 'NFT',
      order: true,
      display: true
    },
    {
      id: 'category',
      position: 'left',
      disablePadding: false,
      label: 'Category',
      order: true,
      display: isSmallScreen ? false : true
    },
    {
      id: 'status',
      position: 'left',
      disablePadding: false,
      label: 'Status',
      order: true,
      display: true
    },
    {
      id: 'price',
      position: 'left',
      disablePadding: false,
      label: 'Price(CH)',
      order: true,
      display: true
    },
    {
      id: 'updatedAt',
      position: 'left',
      disablePadding: false,
      label: 'Latest update',
      order: true,
      display: isSmallScreen ? false : true
    },
    {
      id: 'update',
      position: 'center',
      disablePadding: false,
      label: 'Update',
      order: false,
      display: true
    }
  ]
  
  const getHeadById = (id) => {
    return headCells.find(h => h.id === id)
  }

  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('updatedAt')
  const [pageNfts, setPageNfts] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,  // the index of the current page
    pageSize: 5, // how many items are shown in one page
    pages: 0, // how many pages in total
    total: 0 // how many items in total
  })

  useEffect(() => {
    (async () => {
      await catchAsync(async () => {
        if (wallet?.user) {
          logger.debug('[MyNFTList] add handleFilterUpdate to eventsBus')
          eventsBus.handleFilterUpdate = handleFilterUpdate
          const res = await nftClient.queryNFTsForUser(wallet?.user?.id, pagination.page + 1, pagination.pageSize, `${orderBy}:${order}`)
          const {nfts, totalPages, totalResults} = res
          logger.debug('[MyNFTList] page=', pagination.page + 1, ' limit =', pagination.pageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
          setPageNfts(convertNFTs(nfts))
          setPagination({...pagination, pages: totalPages, total: totalResults})
        }
      }, notifyAlertUpdate)
    })()
    logger.debug('[MyNFTList] call notifyShowMenu in useEffect')
    notifyShowMenu()  // todo: make it configurable rather than setting it in notification
  }, [wallet])

  const handleFilterUpdate = () => {
    logger.debug('[MyNFTList] handleFilterUpdate')
    fetchData()
  }

  const fetchData = () => {
    logger.debug('[MyNFTList] call restful api to get the new list of nfts by latestFilter for user', wallet?.user?.id)
    const latestFilter = getFilter()
    logger.debug('[MyNFTList] latestFilter=', latestFilter)
    logger.debug('[MyNFTList] page=', 1)
    //setRowSates(rows)
  }

  const handleRequestSort = async (event, newOrderBy) => {
    logger.debug('[MyNFTList] handleRequestSort. newOrderBy =', newOrderBy)
    const isAsc = orderBy === newOrderBy && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.debug('newOrder = ', newOrder, 'newOrderBy = ', newOrderBy)
    setOrder(newOrder)
    setOrderBy(newOrderBy)
    await catchAsync(async () => {
      const res = await nftClient.queryNFTsForUser(wallet?.user?.id, pagination.page + 1, pagination.pageSize, `${newOrderBy}:${newOrder}`)
      const {nfts, totalPages, totalResults} = res
      logger.debug('[MyNFTList] page=', pagination.page + 1, ' limit =', pagination.pageSize, 'sortBy =', `${newOrderBy}:${newOrder}`, 'pages=', totalPages, 'total=', totalResults )
      setPageNfts(convertNFTs(nfts))
      setPagination({...pagination, pages: totalPages, total: totalResults})
    }, notifyAlertUpdate)
  }

  const handleChangePage = async (event, newPage) => {
    logger.debug('[MyNFTList] handleChangePage. newPage =', newPage)
    await catchAsync(async () => {
      const res = await nftClient.queryNFTsForUser(wallet?.user?.id, newPage + 1, pagination.pageSize, `${orderBy}:${order}`)
      const {nfts, totalPages, totalResults} = res
      logger.debug('[MyNFTList] page=', newPage + 1, ' limit =', pagination.pageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
      setPageNfts(convertNFTs(nfts))
      setPagination({...pagination, page: newPage, pages: totalPages, total: totalResults})
    }, notifyAlertUpdate)
  }

  const handleChangeRowsPerPage = async (event) => {
    logger.debug('[MyNFTList] handleChangeRowsPerPage.')
    await catchAsync(async () => {
      const newPageSize = parseInt(event.target.value, 10)
      const res = await nftClient.queryNFTsForUser(wallet?.user?.id, 1, newPageSize, `${orderBy}:${order}`)
      const {nfts, totalPages, totalResults} = res
      logger.debug('[MyNFTList] page=', 1, ' limit =', newPageSize, 'sortBy =', `${orderBy}:${order}`, 'pages=', totalPages, 'total=', totalResults )
      setPageNfts(convertNFTs(nfts))
      setPagination({...pagination, page: 0, pageSize: newPageSize, pages: totalPages, total: totalResults})
    }, notifyAlertUpdate)
  }

  const handleStatusChange = (id) => (newStatus) => {
    logger.info('[MyNFTList] handleStatusChange id=', id, ' newStatus =', newStatus)
    const copies = pageNfts.map((nft) => {
      if (nft.id === id) {
        const copy = {}
        for (const [key, value] of Object.entries(nft)) {
          if (key === 'status') {
              copy[key] = {}
              copy[key].isChanged = true
              copy[key].backUpValue = value?.backUpValue ? value?.backUpValue : value?.value
              copy[key].value = newStatus
          } else {
              copy[key] = value
          }
        }
        return copy
      } else {
        return nft
      }
    })
    setPageNfts(copies)
  }

  const handlePriceChange = (id) => (e) => {
    logger.info('[MyNFTList] handlePriceChange, id =', id, 'value=', e.target.value)
    const copies = pageNfts.map((nft) => {
      if (nft.id === id) {
        const copy = {}
        for (const [key, value] of Object.entries(nft)) {
          if (key === 'price') {
              copy[key] = {}
              copy[key].isChanged = true
              copy[key].backUpValue = value?.backUpValue ? value?.backUpValue : value?.value
              copy[key].value = e.target.value
          } else {
              copy[key] = value
          }
        }
        return copy
      } else {
        return nft
      }
    })
    setPageNfts(copies)
  }

  const acceptChanges = (id) => {
    logger.debug('[MyNFTList] acceptChanges. id = ', id)
    const copies = pageNfts.map((nft) => {
      if (nft.id === id) {
        const copy = {}
        for (const [key, value] of Object.entries(nft)) {
          if (key === 'price' || key === 'status') {
              copy[key] = {}
              copy[key].isChanged = false
              copy[key].backUpValue = undefined
              copy[key].value = value?.value
          } else {
              copy[key] = value
          }
        }
        return copy
      } else {
        return nft
      }
    })
    setPageNfts(copies)
  }

  const handleRowChange = (id) => async (e) => {
    logger.info('[MyNFTList] handleRowChange, id =', id)
    logger.info('[MyNFTList] call rest api to save changes in row')
    const toUpdate = pageNfts.filter((nft) => nft.id === id)[0]

    const price = toUpdate.price.value
    const status = toUpdate.status.value

    await catchAsync(async () => {
      await nftClient.update(id, price, status)
      acceptChanges(id)
    }, notifyAlertUpdate)
  }

  const handleUndoChange = (id) => (e) => {
    logger.info('[MyNFTList] handleUndoPriceChange, id =', id)
    const copies = pageNfts.map((nft) => {
      if (nft.id === id) {
        const copy = {}
        for (const [key, value] of Object.entries(nft)) {
          if (key === 'price' || key === 'status') {
              copy[key] = {}
              copy[key].value = value?.isChanged ? value?.backUpValue : value?.value
              copy[key].isChanged = false
              copy[key].backUpValue = undefined
          } else {
              copy[key] = value
          }
        }
        return copy
      } else {
        return nft
      }
    })
    setPageNfts(copies)
  }

  const handleSummary = () => {
    const total = pagination.total
    return (
      <Box sx={{display:'flex'}}>
              <Typography ><strong>{total}</strong> items: </Typography>
      </Box>
    )
  }

  logger.debug('[MyNFTList] pageNfts :', pageNfts)
  logger.debug('[MyNFTList] wallet:', wallet)
  
  return (
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
      <ProfileFilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate} handleSummary={handleSummary}/>
      <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 150 }}
              aria-labelledby="My nft list"
              size={'medium'}
            >
              <EnhancedTableHead
                headCells={headCells}
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
                            sx={{display: getHeadById('id').display? 'table-cell': 'none', px:1}}
                            component="th"
                            id={labelId}
                            scope="row"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="center" sx={{display: getHeadById('title').display ?'table-cell': 'none', px:1}}>
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
                          <TableCell align="left" sx={{display: getHeadById('category').display ?'table-cell': 'none', px:1}}>{capitalize(row.category)}</TableCell>
                          <TableCell align="left" sx={{display: getHeadById('status').display ?'table-cell': 'none', px:1}}>
                            <CustomSelect 
                              label={'status'} 
                              showInputLabel={false} 
                              value={row.status.value} 
                              handleChange={handleStatusChange(row.id)} 
                              options={Object.values(config.NFTSTATUS).map((s) => s.description)} 
                              width={70}
                              cap={true}
                              />
                          </TableCell>
                          <TableCell align="center" sx={{display: getHeadById('id').display ?'table-cell': 'none', px:1}}>
                            <Box>
                              <TextField 
                                  id={`price-${row.id}`} 
                                  variant="standard" 
                                  sx={{width:80}}
                                  type='number'
                                  value={row.price?.value}
                                  onChange={handlePriceChange(row.id)}
                                  InputProps={{ inputProps: { min: 0 }}}
                                  onKeyPress={(event) => {
                                    if (event?.key === '-' || event?.key === '+') {
                                      event.preventDefault();
                                    }
                                  }}
                                  />
                            </Box>
                            
                          </TableCell>
                          <TableCell align="left" sx={{display: getHeadById('updatedAt').display ?'table-cell': 'none', px:1}}>{row.updatedAt}</TableCell>
                          <TableCell align="center" sx={{display: getHeadById('update').display ?'table-cell': 'none', px:1}}>
                            {(row.price.isChanged || row.status.isChanged) &&
                            <Box sx={{display:'flex'}}>
                                  <Button sx={{textTransform:'none'}} 
                                      color='customBlack' 
                                      variant='contained' 
                                      onClick={handleRowChange(row.id)}>
                                        <Typography variant='body2'>Save</Typography>
                                  </Button>
                                  <Button sx={{textTransform:'none', ml:1}} 
                                          color='customBlack' 
                                          variant='outlined' 
                                          onClick={handleUndoChange(row.id)}>
                                            <Typography variant='body2'>Cancel</Typography>
                                  </Button>
                            </Box>
                            }
                          </TableCell>
                      </TableRow>
                    )
                  })}
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

