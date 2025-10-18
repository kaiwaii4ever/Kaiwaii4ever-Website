import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Chip,
  InputAdornment,
  TablePagination,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface Player {
  userId: number;
  username: string;
  Banned: boolean;
}

const PageContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(4),
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : theme.palette.background.default,
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
    : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)'
    : '#ffffff',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(56, 189, 248, 0.1)'
    : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 12px rgba(0, 0, 0, 0.5)'
    : '0 4px 12px rgba(0, 0, 0, 0.08)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary.main, 0.1)
    : alpha(theme.palette.primary.main, 0.05),
  '& th': {
    fontWeight: 700,
    color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
    borderBottom: theme.palette.mode === 'dark'
      ? '2px solid rgba(56, 189, 248, 0.2)'
      : `2px solid ${theme.palette.primary.main}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.08)
      : alpha(theme.palette.primary.main, 0.04),
    transform: 'scale(1.01)',
  },
  '& td': {
    borderBottom: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.05)'
      : `1px solid ${theme.palette.divider}`,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: theme.palette.mode === 'dark'
      ? alpha('#0f1419', 0.5)
      : '#ffffff',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(56, 189, 248, 0.2)'
      : `1px solid ${theme.palette.divider}`,
  },
}));

const BannedUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://api.kaiwaii4ever.win/api/user', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.players)) {
          const cleanPlayers = data.players.map((p: any) => ({
            userId:
              typeof p.userId === 'number'
                ? p.userId
                : Number(p.userId?.$numberInt || p.userId),
            username: p.username || 'Unknown',
            Banned: !!p.Banned,
          }));
          setPlayers(cleanPlayers);
        }
      })
      .catch((err) => console.error('Failed to fetch players:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlayers = players
  .filter((player) => player.Banned)
  .filter(
    (player) =>
      player.username.toLowerCase().includes(search.toLowerCase()) ||
      player.userId.toString().includes(search.toLowerCase())
  );

  const paginatedPlayers = filteredPlayers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer>
      <HeaderBox>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <GradientText variant="h4">Banned Users [YATB IN-DEV]</GradientText>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Total Users: {filteredPlayers.length}
        </Typography>
      </HeaderBox>

      <SearchField
        fullWidth
        placeholder="Search by Username or UserID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'primary.main' }} />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <StyledTableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>UserID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {paginatedPlayers.map((player, index) => (
                  <StyledTableRow
                    key={`${player.userId}-${index}`}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{player.userId}</TableCell>
                    <TableCell>{player.username}</TableCell>
                    <TableCell align="center">
                      {player.Banned ? (
                        <Chip
                          icon={<BlockIcon />}
                          label="Banned"
                          color="error"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      ) : (
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Active"
                          color="success"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <TablePagination
            component="div"
            count={filteredPlayers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </>
      )}
    </PageContainer>
  );
};

export default BannedUsers;