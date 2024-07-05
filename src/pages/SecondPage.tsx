// src/pages/SecondPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { Post } from '../models/Post';
import DepartmentList from '../components/DepartmentList';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Box sx={{ height: 400, mb: 5 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid rows={posts} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        )}
      </Box>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>
      <DepartmentList />
    </Box>
  );
};

export default SecondPage;
