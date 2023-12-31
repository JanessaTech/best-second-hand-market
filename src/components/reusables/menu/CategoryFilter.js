import Checkbox from '@mui/material/Checkbox';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function CategoryFilter() {
    const categories = ['Pets', 'Clothes', 'Cosmetics', 'Outfits', 'Car', 'Devices', 'Books']
    const [checked, setChecked] = useState([])
    const [expand, setExpand] = useState(true)

    const handleCategoryChanges = (value) => () => {
        const index = checked.indexOf(value)
        const newChecked = [...checked]
        if (index == -1) {
            newChecked.push(value)
        }else {
            newChecked.splice(index, 1)
        }
        console.log('new checked:', newChecked)
        setChecked(newChecked)
    }

    const toggleCategory = () => {
        console.log('toggleCategory')
        setExpand(!expand)
    }
  return (
    <Box sx={{my:2}}>
        <List sx={{width: 1}}
            subheader={
                <ListSubheader 
                    sx={{color:'black', display:'flex', justifyContent:'space-between', cursor:'pointer'}} 
                    component="div" 
                    id="nested-list-subheader"
                    onClick={toggleCategory}
                    >
                    <Typography variant='h6'>Category</Typography>
                    {expand ? <ExpandLess /> : <ExpandMore />}
                </ListSubheader>
            }
        >
            <Collapse in={!expand} timeout="auto" unmountOnExit>
                {
                    categories.map((category) => {
                        const labelId = `checkbox-list-category-label-${category}`;
                        return (
                            <ListItem 
                                key={category}
                                disablePadding
                                secondaryAction={
                                    <Checkbox
                                        edge='end' 
                                        checked={checked.indexOf(category) !== -1}
                                        onChange={handleCategoryChanges(category)}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                }
                            >
                                <ListItemButton>
                                    <ListItemText id={'labelId'} primary={category}/>
                                </ListItemButton>
                            </ListItem >
                        )
                    })
                }
            </Collapse>
        </List>

    </Box>
  )
}

