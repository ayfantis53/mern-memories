// npm installs
import { useState    } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { Button, Chip, Container, Grow, Grid, TextField, Autocomplete } from '@mui/material';

// project imports
import * as Styled from './Home.styles';
import Form      from '../Form/Form';
import Posts     from '../Posts/Posts';
import Paginate  from '../Paginate/Paginate';
import { getPostsBySearch } from '../../actions/posts';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

/** ----------------------------------------------------------------------------------------
 * 
 * @returns the homepage
 * ----------------------------------------------------------------------------------------*/
export default function Home() {


    const query                     = useQuery();
    const dispatch                  = useDispatch();
    const navigate                  = useNavigate();
    const page                      = query.get('page') || 1;
    const [tags, setTags]           = useState([]);
    const [search, setSearch]       = useState('');
    const [currentId, setCurrentId] = useState('');
    const searchQuery               = query.get('searchQuery');
    

    const handleKeyPress = (e) => {
        // Handle pressing enter on search bar.
        if (e.keyCode === 13) {
            searchPost();
        }
    }   

    const searchPost = () => {
        if (search.length > 0 || tags.length > 0) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none' }&tags=${tags.join(',')}`);
        }
        else {
            navigate('/posts');
        }
    }  

    return (
        <Grow in>
            <Container maxWidth='xl' >
                <Styled.HomeGrid container spacing={3}>
                    <Grid sx={{ width: {xs: '80%', sm: '50%', md: '70%'}}}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid sx={{ width: {xs: '80%', sm: '50%', md: '25%'}}}>
                        <Styled.SearchBar color='inherit'>
                            {/** SEARCH BOX FOR MEMORIES BASED ON TITLE */}
                            <TextField 
                                name            = 'search' 
                                variant         = "outlined" 
                                label           = 'Search Memories' 
                                fullWidth value = {search} 
                                onChange        = { (e)=>{ setSearch(e.target.value) } }
                                onKeyDown       = { handleKeyPress }
                            />
                            {/** SEARCH BOX FOR MEMORIES BASED ON TAGS */}
                            <Autocomplete multiple id="tags-standard" freeSolo
                                onChange        = {(e, newValue) => setTags(newValue)}
                                options         = {tags.map((tag) => tag)}
                                getOptionLabel  = {tag => tag}
                                fullWidth value = {tags}
                                renderValue     = {(value, getTagProps) => value.map((tag, index) =>(<Chip variant="outlined" label={tag} {...getTagProps({ index })} key={tag} /> ))}
                                renderInput     = {params => (<TextField {...params} variant="outlined" label="Search Tags" />)}
                            /> 
                            {/** SEARCH BUTTON */}
                            <Button onClick={searchPost} color='primary' variant='contained' fullWidth> Search </Button>          
                        </Styled.SearchBar>
                        
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>

                        {(!searchQuery && !tags.length) && (
                            <Styled.Pagination elevation={6}>
                                <Paginate  page={page} />
                            </Styled.Pagination>
                        )}
                    </Grid>
                </Styled.HomeGrid>
            </Container>
        </Grow>
    );
};