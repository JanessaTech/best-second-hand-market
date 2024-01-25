import { Box, Paper, Table, TableCell, TableBody , TableContainer, TableHead, TableRow, useMediaQuery, TableSortLabel, TablePagination, Button, TextField } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import {HeaderHeight, FilterBarHeight} from '../../common/constant'
import {GlobalVariables} from '../MainLayout'
import ProfileFilterBar from './ProfileFilterBar'
import PropTypes from 'prop-types'

function createData(id, name, category, sstatus, price, createdTime, views, favorites) {
  return {
    id,
    name,
    category,
    sstatus,
    price,
    createdTime,
    views,
    favorites,
  };
}

const rows = [
  createData(1, 'green monkey', 'Pets', 'On', {value: 61, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 221),
  createData(2, 'Cute dress', 'Clothes', 'On', {value: 62, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 222),
  createData(3, 'green monkey', 'Clothes', 'On', {value: 63, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 223),
  createData(4, 'Frozen yoghurt', 'Clothes', 'On', {value: 64, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 224),
  createData(5, 'Gingerbread', 'Clothes', 'On', {value: 65, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 225),
  createData(6, 'Honeycomb', 'Clothes', 'On', {value: 66, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 226),
  createData(7, 'Ice cream sandwich', 'Clothes', 'On', {value: 67, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 227),
  createData(8, 'Jelly Bean', 'Clothes', 'Off', {value: 68, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 228),
  createData(9, 'KitKat', 'Clothes', 'On', {value: 69, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 229),
  createData(10, 'Lollipop', 'Clothes', 'Off', {value: 70, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 230),
  createData(11, 'Marshmallow', 'Clothes', 'Off', {value: 71, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 231),
  createData(12, 'Nougat', 'Clothes', 'Off', {value: 72, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 232),
  createData(13, 'Oreo', 'Clothes', 'On', {value: 73, isChanged: false, backUpValue: undefined}, 'Jan 2th, 2024', 102, 233),
];

const headCells = [
  {
    id: 'id',
    position: 'left',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    position: 'center',
    disablePadding: false,
    label: 'NFT',
  },
  {
    id: 'category',
    position: 'center',
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'sstatus',
    position: 'center',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'price',
    position: 'center',
    disablePadding: false,
    label: 'Price(CH)',
  },
  {
    id: 'createdTime',
    position: 'center',
    disablePadding: false,
    label: 'Created Time',
  },
  {
    id: 'views',
    position: 'center',
    disablePadding: false,
    label: 'views',
  },
  {
    id: 'favorites',
    position: 'center',
    disablePadding: false,
    label: 'Favorites',
  },
  {
    id: 'update',
    position: 'center',
    disablePadding: false,
    label: 'Update',
  },
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
  orderBy: PropTypes.string.isRequired
};

export default function MyNFTList() {
  const {menuOpen, toggleMenu, notifyFilterUpdate} = React.useContext(GlobalVariables)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [rowStates, setRowSates] = React.useState(rows)

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

  const handlePriceChange = (id) => (e) => {
    console.log('handlePriceChange, id =', id, 'value=', e.target.value)
    const newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id === id) {
        newRowStates.push({
          id: rowStates[i].id,
          name: rowStates[i].name,
          category: rowStates[i].category,
          sstatus: rowStates[i].sstatus,
          price: {value: e.target.value, isChanged: true, backUpValue: rowStates[i].price.backUpValue ? rowStates[i].price.backUpValue: rowStates[i].price.value},
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
    console.log('handleRowChange, id =', id)
    console.log('call rest api to save changes in row')
  }

  const handleUndoPriceChange = (id) => (e) => {
    console.log('handleUndoPriceChange, id =', id)
    const newRowStates = []
    for (var i = 0; i < rowStates.length; i++) {
      if (rowStates[i].id === id) {
        newRowStates.push({
          id: rowStates[i].id,
          name: rowStates[i].name,
          category: rowStates[i].category,
          sstatus: rowStates[i].sstatus,
          price: {value: rowStates[i].price.backUpValue, isChanged: false, backUpValue: undefined},
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


console.log(rowStates)
  return (
    <Box component="main" sx={{width:1}}>
      <Box sx={{width:1, height: HeaderHeight + FilterBarHeight}}></Box>
      <ProfileFilterBar menuOpen={menuOpen} toggleMenu={toggleMenu} notifyFilterUpdate={notifyFilterUpdate}/>
      <Box sx={{mt:1, mb:8, mx: isSmallScreen ? 1: 3}}>
        
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
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
                    const labelId = `enhanced-table-index-${index}`
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
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.category}</TableCell>
                          <TableCell align="center">{row.sstatus}</TableCell>
                          <TableCell align="center">
                            <Box>
                              <TextField 
                                  id={`price-${row.id}`} 
                                  variant="standard" 
                                  sx={{width:120}}
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
                          <TableCell align="right">{row.createdTime}</TableCell>
                          <TableCell align="right">{row.views}</TableCell>
                          <TableCell align="right">{row.favorites}</TableCell>
                          <TableCell align="center" sx={{width: 200}}>
                            {row.price.isChanged && 
                            <Box sx={{display:'flex'}}>
                              <Button sx={{textTransform:'none'}} color='customBlack' variant='contained' onClick={handleRowChange(row.id)}>Save</Button>
                              <Button sx={{textTransform:'none', ml:1}} color='customBlack' variant='contained' onClick={handleUndoPriceChange(row.id)}>Cancel</Button>
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

