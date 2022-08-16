import { FormControl, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearch } from '../../../redux/product';

const SearchField = () => {
  const [searching, setSearching] = React.useState();
  const location = useLocation().pathname
  const {id} = useParams()
  const dispatch = useDispatch()
  const searched = useSelector(state => state.product.searched)
  const navigate = useNavigate()
  const handleKeyDown = async (e) =>{
    if (e.key === 'Enter') {
        navigate('/')
        dispatch(setSearch(searching))
    }
  }
  return (
    <>
      <FormControl>
        <TextField
          onKeyDown={handleKeyDown}
          onChange= {(e) => setSearching(e.target.value)}
          id="search"
          placeholder="Cari di sini ..."
          fullWidth
          defaultValue={searched}
          variant="standard"
          sx={{ ml: 3, width: '100%', minWidth: { xs: '100%', md: '380px' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            style: {
              color: '#000',
              fontSize: '1rem',
              padding: '.5rem 1rem',
              borderRadius: '20px',
              backgroundColor: '#f5f5f5',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }
          }}
        />
      </FormControl>
    </>
  )
}

export default SearchField