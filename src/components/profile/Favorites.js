import { Box, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'
import { UnavailableHelpTip } from '../../common/TipHelpers'
import logger from '../../common/Logger'

function createData(id, title, img, network, category, price, views, favorites, available) {
  return {
    id,
    title,
    img, 
    network, 
    category,
    price,
    views,
    favorites,
    available
  };
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'ethereum', 'Pets', 61, 102, 221),
  createData(2, 'Cute dress', 'mk.png', 'ethereum', 'Clothes', 62, 102, 222, true),
  createData(3, 'green monkey', 'mk.png', 'ethereum', 'Clothes', 63, 102, 223, true),
  createData(4, 'Frozen yoghurt', 'mk.png', 'ethereum', 'Clothes', 64, 102, 224, true),
  createData(5, 'Gingerbread', 'mk.png', 'ethereum', 'Clothes', 65, 102, 225, true),
  createData(6, 'Honeycomb', 'mk.png', 'ethereum', 'Clothes', 66, 102, 226, true),
  createData(7, 'Ice cream sandwich', 'mk.png', 'ethereum', 'Clothes', 67, 102, 227, true),
  createData(8, 'Jelly Bean', 'mk.png', 'ethereum', 'Clothes', 68, 102, 228, true),
  createData(9, 'KitKat', 'mk.png', 'ethereum', 'Clothes', 69, 102, 229, true),
  createData(10, 'Lollipop', 'mk.png', 'ethereum', 'Clothes', 70, 102, 230, true),
  createData(11, 'Marshmallow', 'mk.png', 'ethereum', 'Clothes', 71, 102, 231, true),
  createData(12, 'Nougat', 'mk.png', 'ethereum', 'Clothes', 72, 102, 232, true),
  createData(13, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 73, 102, 233, true),
  createData(14, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 74, 102, 233, true),
  createData(15, 'Oreo', 'mk.png', 'ethereum', 'Clothes', 75, 102, 233, true),
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
    id: 'views',
    position: 'left',
    disablePadding: false,
    label: 'Views',
  },
  {
    id: 'favorites',
    position: 'left',
    disablePadding: false,
    label: 'Favorites',
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
  const {menuOpen, toggleMenu, notifyFilterUpdate} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('createdTime')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rowStates, setRowSates] = React.useState(rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    logger.info('newOrder = ', newOrder, 'property = ', property)
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

  const handleDelete = (id) => (e) => {
    logger.info('handleDelete id=', id)
    logger.info('call restful api to delete a favorite by id=', id)
    
    var newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id !== id) {
        newRowStates.push(rowStates[i])
      }
    }
    setRowSates(newRowStates)
  }

  const visibleRows = React.useMemo(
    () => {
      logger.info('call restful api to get result')
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
                      visibleRows.map((row, index) => {
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
                            <TableCell align="left" sx={{px:1}}>
                            {row.available ? row.price : <UnavailableHelpTip/>}
                            </TableCell>
                            <TableCell align="left" sx={{px:1}}>{row.views}</TableCell>
                            <TableCell align="left" sx={{px:1}}>{row.favorites}</TableCell>
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

