// npm installs
import { useEffect      } from 'react';
import { Link           } from 'react-router';
import { PaginationItem } from '@mui/material';
import { useDispatch, useSelector   } from 'react-redux';



// project imports
import { getPosts } from '../../actions/posts';
import * as Styled from './Paginate.styles';


/** ----------------------------------------------------------------------------------------
 * 
 * @param {*} param0 
 * @returns a 
 * ----------------------------------------------------------------------------------------*/
export default function Paginate({ page }) {

  const dispatch          = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
      <Styled.Pages 
        count      = {numberOfPages} 
        page       = {Number(page) || 1} 
        variant    = "outlined" 
        color      = 'primary' 
        renderItem = {(item)=>(
          <PaginationItem {...item} component={Link} to ={`/posts?page=${item.page}`}/>
        )} />
  );
};