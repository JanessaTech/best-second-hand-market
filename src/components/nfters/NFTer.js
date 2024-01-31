import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import logger from '../../common/Logger'
import {GlobalVariables} from '../MainLayout'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import ProfileFilterBar from '../profile/ProfileFilterBar'

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
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'Pets', 61),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'Clothes', 62),
  createData(3, 'green monkey', 'mk.png', 'ethereum', 'Clothes', 63),
  createData(4, 'Frozen yoghurt', 'mk.png', 'ethereum', 'Clothes', 64),
  createData(5, 'Gingerbread', 'mk.png', 'ethereum', 'Clothes', 65),
  createData(6, 'Honeycomb', 'mk.png', 'ethereum', 'Clothes', 66),
  createData(7, 'Ice cream sandwich', 'mk.png', 'ethereum', 'Clothes', 67),
  createData(8, 'Jelly Bean', 'mk.png', 'ethereum', 'Clothes', 68),
  createData(9, 'KitKat', 'mk.png', 'ethereum', 'Clothes', 69),
  createData(10, 'Lollipop', 'mk.png', 'ethereum', 'Clothes', 70),
  createData(11, 'Marshmallow', 'mk.png', 'ethereum', 'Clothes', 71),
  createData(12, 'Nougat', 'mk.png', 'ethereum', 'Clothes', 72),
  createData(13, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 73),
  createData(14, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 74),
  createData(15, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 75),
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

export default function NFTer() {
  logger.debug('[Favorites] rendering...')
  const {menuOpen, toggleMenu, notifyFilterUpdate} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined

  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('createdTime')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowStates, setRowSates] = useState([])

  useEffect(() => {
    logger.debug('[NFTer] call restful api to get the list of my favorites by user id=', user?.id)
    setRowSates(rows)
  }, [])

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
      logger.info('[NFTer] call restful api to get result')
      return rowStates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [order, orderBy, page, rowsPerPage, rowStates]
  )

  const handleSummary = () => {
    const total = rowStates.length
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
                                <TableCell align="left" sx={{px:1}}>{row.category}</TableCell>
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

