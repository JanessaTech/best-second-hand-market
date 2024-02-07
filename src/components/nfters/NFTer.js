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

function createData(id, title, img, network, category, price) {
  return {
    id,
    title,
    img, 
    network, 
    category,
    price
  }
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'pets', 61),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'clothes', 62),
  createData(3, 'green monkey', 'mk.png', 'ethereum', 'clothes', 63),
  createData(4, 'Frozen yoghurt', 'mk.png', 'ethereum', 'clothes', 64),
  createData(5, 'Gingerbread', 'mk.png', 'ethereum', 'clothes', 65),
  createData(6, 'Honeycomb', 'mk.png', 'ethereum', 'clothes', 66),
  createData(7, 'Ice cream sandwich', 'mk.png', 'ethereum', 'clothes', 67),
  createData(8, 'Jelly Bean', 'mk.png', 'ethereum', 'clothes', 68),
  createData(9, 'KitKat', 'mk.png', 'ethereum', 'clothes', 69),
  createData(10, 'Lollipop', 'mk.png', 'ethereum', 'clothes', 70),
  createData(11, 'Marshmallow', 'mk.png', 'ethereum', 'clothes', 71),
  createData(12, 'Nougat', 'mk.png', 'ethereum', 'clothes', 72),
  createData(13, 'Oreo', 'mk.png', 'ethereum', 'clothes', 73),
  createData(14, 'Oreo', 'mk.png', 'ethereum', 'clothes', 74),
  createData(15, 'Oreo', 'mk.png', 'ethereum', 'clothes', 75),
];

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
  const {wallet, menuOpen, toggleMenu, trigger, notifyFilterUpdate, notifyShowMenu} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('price')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowStates, setRowSates] = useState([])

  useEffect(() => {
    if (wallet?.address) {
      logger.debug('[NFTer] call restful api to get the new list of nfts by wallet address=', wallet?.address)
      const latestFilter = getFilter()
      logger.debug('[NFTer] trigger=', trigger)
      logger.debug('[NFTer] latestFilter=', latestFilter)
      logger.debug('[NFTer] page=', 1)
      setRowSates(rows)
    }
    logger.debug('[NFTer] call notifyShowMenu in useEffect')
    notifyShowMenu()
  }, [wallet, trigger])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.info('[NFTer] newOrder = ', newOrder, 'property = ', property)
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

  const handleSummary = () => {
    const total = rowStates.length
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
                        visibleRows.map((row, index) => {
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
                count={rowStates.length}
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

