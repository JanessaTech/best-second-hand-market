import { Box, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import ProfileFilterBar from './ProfileFilterBar'
import {GlobalVariables} from '../MainLayout'

function createData(id, title, img, from, category, price, orderedTime, seller) {
  return {
    id,
    title,
    img, 
    from, 
    category,
    price,
    orderedTime,
    seller
  };
}

const rows = [
  createData(1, 'green monkey yyyyyyyy', 'mk.png', 'JanessaTech lab', 'Pets', 12, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(2, 'Cute dress', 'mk.png', 'JanessaTech lab', 'Pets', 22, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(3, 'Frozen yoghurt', 'mk.png', 'JanessaTech lab', 'Pets', 32, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(4, 'Gingerbread', 'mk.png', 'JanessaTech lab', 'Pets', 42, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(5, 'Honeycomb', 'mk.png', 'JanessaTech lab', 'Pets', 52, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(6, 'Ice cream sandwich', 'mk.png', 'JanessaTech lab', 'Pets', 62, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(7, 'Jelly Bean', 'mk.png', 'JanessaTech lab', 'Pets', 72, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(8, 'KitKat', 'mk.png', 'JanessaTech lab', 'Pets', 82, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(9, 'Lollipop', 'mk.png', 'JanessaTech lab', 'Pets', 92, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(10, 'Marshmallow', 'mk.png', 'JanessaTech lab', 'Pets', 122, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(11, 'Nougat', 'mk.png', 'JanessaTech lab', 'Pets', 222, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(12, 'Jeniffer', 'mk.png', 'JanessaTech lab', 'Pets', 342, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(13, 'Lidanaa', 'mk.png', 'JanessaTech lab', 'Pets', 442, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(14, 'Test for this one', 'mk.png', 'JanessaTech lab', 'Pets', 62, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(15, 'Day dream for success', 'mk.png', 'JanessaTech lab', 'Pets', 772, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
  createData(16, 'Day dream for success2', 'mk.png', 'JanessaTech lab', 'Pets', 772, 'Jan 2th, 2024', '0xcdcbb4f79e3770252ee32d89b6673eb68f27bbf0'),
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
    id: 'orderedTime',
    position: 'left',
    disablePadding: false,
    label: 'Ordered Time',
  },
  {
    id: 'seller',
    position: 'left',
    disablePadding: false,
    label: 'Seller',
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
  const {menuOpen, toggleMenu, notifyFilterUpdate} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rowStates, setRowStates] = useState(rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc'
    console.log('newOrder = ', newOrder, 'property = ', property)
    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () => {
      console.log('call restful api to get result')
      return rowStates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }, [order, orderBy, page, rowsPerPage, rowStates]
  )

  

  const handleSummary = () => {
    const total = rowStates.length
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
                    visibleRows.map((row, index) => {
                      const labelId = `nft-list-table-index-${index}`
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                          >
                            {row.id}
                          </TableCell>
                          <TableCell align="center">
                            <Link href={`/nft?id=${row.id}`}>
                                <Box sx={{display:'flex'}}>
                                    <Box
                                      component='img'
                                      sx={{width: 50, borderRadius:2, height:50, mr:1}}
                                      alt={row.title}
                                      src={`/imgs/nfts/${row.img}`}
                                    >
                                    </Box>
                                    <Box sx={{width:150}}>
                                        <Typography variant='body1' 
                                          sx={{fontWeight:'bold', whiteSpace: 'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign:'left'}}>{row.title}</Typography>
                                        <Typography variant='body2' color='text.secondary' 
                                          sx={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', textAlign:'left'}}>{row.from}</Typography>
                                    </Box>
                                </Box>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{row.category}</TableCell>
                          <TableCell align="left">{row.price}</TableCell>
                          <TableCell align="left">{row.orderedTime}</TableCell>
                          <TableCell align="left">{row.seller}</TableCell>
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

