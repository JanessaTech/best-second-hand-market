import { Box, Paper, Table, TableCell, TableBody , TableContainer, TableHead, TableRow, useMediaQuery, TableSortLabel, TablePagination, Button, TextField, Typography, Link } from '@mui/material'
import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, FilterBarHeight, NFTSTATUS} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'
import PropTypes from 'prop-types'
import CustomSelect from '../../common/CustomSelect'
import logger from '../../common/Logger'
import {capitalize} from '../../utils/StringUtils'

function createData(id, title, img, network, category, sstatus, price, createdTime, views, favorites) {
  return {
    id,
    title,
    img, 
    network, 
    category,
    sstatus,
    price,
    createdTime,
    views,
    favorites,
  };
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'pets', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 61, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 221),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 62, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 222),
  createData(3, 'green monkey', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 63, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 223),
  createData(4, 'Frozen yoghurt', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 64, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 224),
  createData(5, 'Gingerbread', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 65, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 225),
  createData(6, 'Honeycomb', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 66, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 226),
  createData(7, 'Ice cream sandwich', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 67, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 227),
  createData(8, 'Jelly Bean', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 68, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 228),
  createData(9, 'KitKat', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 69, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 229),
  createData(10, 'Lollipop', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 70, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 230),
  createData(11, 'Marshmallow', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 71, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 231),
  createData(12, 'Nougat', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 72, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 232),
  createData(13, 'Oreo', 'mk.png', 'ethereum', 'clothes', {value: 'off', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 233),
  createData(14, 'Oreo', 'mk.png', 'ethereum', 'clothes', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 233),
  createData(15, 'Oreo', 'mk.png', 'ethereum', 'pets', {value: 'on', isChanged: false, backUpValue: undefined }, {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 233),
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

function getFilter() {
  let filter = localStorage.getItem('filter')
  if (filter) {
    return JSON.parse(filter)
  }
  return {}
}

export default function MyNFTList() {
  logger.debug('[MyNFTList] rendering....')
  const {wallet, menuOpen, toggleMenu, trigger, notifyFilterUpdate} = React.useContext(GlobalVariables)
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
      id: 'sstatus',
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
      id: 'createdTime',
      position: 'left',
      disablePadding: false,
      label: 'Created Time',
      order: true,
      display: isSmallScreen ? false : true
    },
    {
      id: 'views',
      position: 'left',
      disablePadding: false,
      label: 'Views',
      order: true,
      display: isSmallScreen ? false : true
    },
    {
      id: 'favorites',
      position: 'left',
      disablePadding: false,
      label: 'Favorites',
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

  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('createdTime')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rowStates, setRowSates] = React.useState([])


  useEffect(() => {
    logger.debug('[MyNFTList] call restful api to get the list of my nfts by user id=', wallet?.user?.id)
    const latestFilter = getFilter()
    logger.debug('[MyNFTList] trigger=', trigger)
    logger.debug('[MyNFTList] latestFilter=', latestFilter)
    logger.debug('[MyNFTList] page=', 1)
    setRowSates(rows)

  }, [trigger])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.debug('newOrder = ', newOrder, 'property = ', property)
    setOrder(newOrder);
    setOrderBy(property);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const visibleRows = React.useMemo(
    () => {
      return rowStates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [order, orderBy, page, rowsPerPage, rowStates]
  )

  const handleStatusChange = (id) => (status) => {
    logger.info('[MyNFTList] handleStatusChange id=', id, ' status =', status)
    const newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id === id) {
        newRowStates.push({
          id: rowStates[i].id,
          title: rowStates[i].title,
          img:  rowStates[i].img,
          network:  rowStates[i].network,
          category: rowStates[i].category,
          sstatus: {
                value: status, 
                isChanged: true, 
                backUpValue: rowStates[i].sstatus.backUpValue ? rowStates[i].sstatus.backUpValue: rowStates[i].sstatus.value
              },
          price: rowStates[i].price,
          createdTime: rowStates[i].createdTime,
          views: rowStates[i].views,
          favorites: rowStates[i].favorites
        })
      } else {
        newRowStates.push(rowStates[i])
      }
    }
    setRowSates(newRowStates)
  }

  const handlePriceChange = (id) => (e) => {
    logger.info('[MyNFTList] handlePriceChange, id =', id, 'value=', e.target.value)
    const newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id === id) {
        newRowStates.push({
          id: rowStates[i].id,
          title: rowStates[i].title,
          img:  rowStates[i].img,
          network:  rowStates[i].network,
          category: rowStates[i].category,
          sstatus: rowStates[i].sstatus,
          price: {
                value: e.target.value, 
                isChanged: true, 
                backUpValue: rowStates[i].price.backUpValue ? rowStates[i].price.backUpValue: rowStates[i].price.value
                },
          createdTime: rowStates[i].createdTime,
          views: rowStates[i].views,
          favorites: rowStates[i].favorites
        })
      } else {
        newRowStates.push(rowStates[i])
      }
    }
    setRowSates(newRowStates)
  }

  const handleRowChange = (id) => (e) => {
    logger.info('[MyNFTList] handleRowChange, id =', id)
    logger.info('[MyNFTList] call rest api to save changes in row')
  }

  const handleUndoChange = (id) => (e) => {
    logger.info('[MyNFTList] handleUndoPriceChange, id =', id)
    const newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id === id) {
        newRowStates.push({
          id: rowStates[i].id,
          title: rowStates[i].title,
          img:  rowStates[i].img,
          network:  rowStates[i].network,
          category: rowStates[i].category,
          sstatus: {
              value: rowStates[i].sstatus.isChanged ? rowStates[i].sstatus.backUpValue : rowStates[i].sstatus.value, 
              isChanged: false, 
              backUpValue: undefined
              },
          price: {
              value: rowStates[i].price.isChanged ? rowStates[i].price.backUpValue : rowStates[i].price.value, 
              isChanged: false, 
              backUpValue: undefined
              },
          createdTime: rowStates[i].createdTime,
          views: rowStates[i].views,
          favorites: rowStates[i].favorites
        })
      } else {
        newRowStates.push(rowStates[i])
      }
    }
    setRowSates(newRowStates)
  }

  const handleSummary = () => {
    const total = rowStates.length
    const sales = rowStates.filter((row) => row.sstatus.value === 'On').length
    return (
      <Box sx={{display:'flex'}}>
              <Typography ><strong>{total}</strong> items: </Typography>
              <Typography><strong>{sales}</strong> on sales</Typography>
      </Box>
    )
  }

  logger.debug('[MyNFTList] rowStates :', rowStates)
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
                  visibleRows.map((row, index) => {
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
                            <Link href={`/nft?id=${row.id}`}>
                                <Box sx={{display:'flex'}}>
                                    <Box
                                        component='img'
                                        sx={{width: 70, borderRadius:2, height:70, mr:1}}
                                        alt={row.title}
                                        src={`/imgs/nfts/${row.img}`}
                                    >
                                    </Box>
                                    <Box sx={{width:100, display:'flex', flexDirection:'column'}}>
                                        <Typography variant='body1' 
                                          sx={{fontWeight:'bold', whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign:'left'}}>{row.title}</Typography>
                                        <Box component='img' sx={{width:15, mr:1}} src={`/imgs/networks/${row.network}.svg`}/>
                                    </Box>
                                </Box>
                            </Link>
                          </TableCell>
                          <TableCell align="left" sx={{display: getHeadById('category').display ?'table-cell': 'none', px:1}}>{capitalize(row.category)}</TableCell>
                          <TableCell align="left" sx={{display: getHeadById('sstatus').display ?'table-cell': 'none', px:1}}>
                            <CustomSelect 
                              label={'status'} 
                              showInputLabel={false} 
                              value={row.sstatus.value} 
                              handleChange={handleStatusChange(row.id)} 
                              options={NFTSTATUS} 
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
                          <TableCell align="left" sx={{display: getHeadById('createdTime').display ?'table-cell': 'none', px:1}}>{row.createdTime}</TableCell>
                          <TableCell align="left" sx={{display: getHeadById('views').display ?'table-cell': 'none', px:1}}>{row.views}</TableCell>
                          <TableCell align="left" sx={{display: getHeadById('favorites').display ?'table-cell': 'none', px:1}}>{row.favorites}</TableCell>
                          <TableCell align="center" sx={{display: getHeadById('update').display ?'table-cell': 'none', px:1}}>
                            {(row.price.isChanged || row.sstatus.isChanged) &&
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  )
}

