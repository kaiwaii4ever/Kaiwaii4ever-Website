import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  alpha,
  styled,
} from "@mui/material";

import {
  Search as SearchIcon,
  DataObject as DataObjectIcon,
  Close as CloseIcon,
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
} from "@mui/icons-material";

interface Player {
  userId: number;
  username: string;
  Banned: boolean;
}

interface PlayerDataItem {
  universeId: string;
  success: boolean;
  keys?: string[];
  fullData: Record<string, any>;
  error?: {
    error: string;
    message: string;
    errorDetails?: Array<{ errorDetailType: string; datastoreErrorCode: string }>;
  };
}

interface PlayerDetails {
  UserId: string;
  Name: string;
  Data: PlayerDataItem[];
}

const PageContainer = styled(Box)(({ theme }) => ({
  marginLeft: 260,
  marginTop: 64,
  padding: theme.spacing(4),
  minHeight: "calc(100vh - 64px)",
  backgroundColor: theme.palette.mode === "dark" ? "#0a0e1a" : theme.palette.background.default,
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  background: theme.palette.mode === "dark" ? "#0f1419" : "#ffffff",
  border: theme.palette.mode === "dark" ? "1px solid rgba(245, 158, 11, 0.2)" : `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === "dark" ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    background: theme.palette.mode === "dark" ? "linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%)" : "#ffffff",
    border: theme.palette.mode === "dark" ? "1px solid rgba(56, 189, 248, 0.2)" : `1px solid ${theme.palette.divider}`,
    maxWidth: 800,
  },
}));

const DataBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? alpha("#0f1419", 0.5) : alpha("#f1f5f9", 0.8),
  borderRadius: 8,
  padding: theme.spacing(2),
  border: theme.palette.mode === "dark" ? "1px solid rgba(56, 189, 248, 0.1)" : `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: theme.palette.mode === "dark" ? alpha("#0f1419", 0.5) : "#ffffff",
    border: theme.palette.mode === "dark" ? "1px solid rgba(245, 158, 11, 0.2)" : `1px solid ${theme.palette.divider}`,
  },
}));

const PlayerStore: React.FC = () => {
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetch("https://api.kaiwaii4ever.win/api/roblox/player", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.players)) {
          const cleanPlayers = data.players.map((p: any) => ({
            userId: typeof p.userId === "number" ? p.userId : Number(p.userId?.$numberInt || p.userId),
            username: p.username || "Unknown",
            Banned: !!p.Banned,
          }));
          setPlayers(cleanPlayers);
        }
      })
      .catch((err) => console.error("Failed to fetch players:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlayers = players.filter(
    (p) => p.username.toLowerCase().includes(search.toLowerCase()) || p.userId.toString().includes(search.toLowerCase())
  );

  const paginatedPlayers = filteredPlayers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = async (player: Player) => {
    setSelectedPlayer(player);
    setPlayerDetails(null);
    setLoadingDetails(true);

    try {
      const res = await fetch(
        `https://api.kaiwaii4ever.win/api/user/player-data?UserID=${player.userId}&universeID=8884363358&datastore=PlayerData`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (data && Array.isArray(data.data)) {
        const allItems = data.data;

        // Only take successful datastores
        const successfulItems = allItems.filter((item: any) => item.success);

        const mappedData: PlayerDetails = {
          UserId: data.userId?.toString() || player.userId.toString(),
          Name: data.username || player.username,
          Data: successfulItems.map((item: any) => ({
            universeId: item.universeId,
            success: item.success,
            fullData: item.data?.Data || {},
            error: item.error || undefined,
          })),
        };

        setPlayerDetails(mappedData);
      } else {
        setPlayerDetails({
          UserId: player.userId.toString(),
          Name: player.username,
          Data: [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch player details:", err);
      setPlayerDetails({
        UserId: player.userId.toString(),
        Name: player.username,
        Data: [],
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleClose = () => {
    setSelectedPlayer(null);
    setPlayerDetails(null);
  };

  return (
    <PageContainer>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <DataObjectIcon sx={{ fontSize: 40, color: "#f59e0b" }} />
        <GradientText variant="h4">Player Store [YATB IN-DEV]</GradientText>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Total Players: {filteredPlayers.length}
      </Typography>

      <SearchField
        fullWidth
        placeholder="Search by Username or UserID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ my: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#f59e0b" }} />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={60} sx={{ color: "#f59e0b" }} />
        </Box>
      ) : (
        <>
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>UserID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPlayers.map((player, index) => (
                  <TableRow
                    key={`${player.userId}-${index}`}
                    hover
                    onClick={() => handleRowClick(player)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{player.userId}</TableCell>
                    <TableCell>{player.username}</TableCell>
                    <TableCell align="center">
                      {player.Banned ? (
                        <Chip icon={<BlockIcon />} label="Banned" color="error" size="small" sx={{ fontWeight: 600 }} />
                      ) : (
                        <Chip icon={<CheckCircleIcon />} label="Active" color="success" size="small" sx={{ fontWeight: 600 }} />
                      )}
                    </TableCell>
                  </TableRow>
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

      <StyledDialog open={!!selectedPlayer} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <InventoryIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700}>
              {selectedPlayer?.username}'s DataStore
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          {loadingDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : !playerDetails || playerDetails.Data.length === 0 ? (
            <Typography color="error.main">No store data found.</Typography>
          ) : (
            playerDetails.Data.map((storeItem, idx) => (
              <DataBox key={idx}>
                <Typography fontWeight={600} gutterBottom>
                  Universe: {storeItem.universeId}
                </Typography>
                {storeItem.error && (
                  <Typography color="error.main" gutterBottom>
                    {storeItem.error.message || "Error fetching this datastore."}
                  </Typography>
                )}
                {storeItem.keys && (
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Keys: {storeItem.keys.join(", ")}
                  </Typography>
                )}
                <pre style={{ margin: 0, fontSize: "0.875rem" }}>
                  {JSON.stringify(storeItem.fullData, null, 2)}
                </pre>
              </DataBox>
            ))
          )}
        </DialogContent>
      </StyledDialog>
    </PageContainer>
  );
};

export default PlayerStore;