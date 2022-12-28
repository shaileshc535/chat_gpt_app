import React, { useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { ReactStateDeclaration } from "@uirouter/react";
import { $crud } from "./factories/CrudFactory";
import { MoreVertical } from "react-feather";
import moment from "moment";
import { Pagination } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";

export function Transactions() {
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [transactions, setTransaction] = useState([]);
  console.log("transactions", transactions);
  const open = Boolean(anchorEl);

  const close = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const data = await $crud
        .get("user/transactions", {
          page,
          limit,
        })
        .then((result) => {
          setTransaction(result.data);
          setPage(result.page);
          setTotalPage(result.totalPages);
        })
        .catch((error) => console.log(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [page, limit, totalPage]);

  return (
    <Grid className="p-3" container direction="column" wrap="nowrap">
      <Grid container wrap="nowrap" direction="column" component={Paper}>
        <Grid container alignItems="center" className="p-2-all">
          <Typography
            variant="h6"
            component={Grid}
            item
            xs
            className="font-weight-bold pl-3"
          >
            Transactions List
          </Typography>
          <Grid item xs md={4}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              color="primary"
            />
          </Grid>
        </Grid>
        {loading && <LinearProgress />}
        <Grid className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Id</th>
                <th>Patient Id</th>
                <th>Therapist Id</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date Time</th>
                <th>CreatedAt</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((data, i) => (
                <tr key={i} style={{ verticalAlign: "middle" }}>
                  <td>{i + 1}</td>
                  <td>{data.transactionId}</td>
                  <td>{data.patientId}</td>
                  <td>{data.doctorId}</td>
                  <td>{data.status}</td>
                  <td>{data.amount}</td>
                  <td>{data.status}</td>
                  <td>{moment(data.dateTime).format("DD-mm-YYYY HH:mm")}</td>
                  <td>{moment(data.createdAt).format("DD-mm-YYYY HH:mm")}</td>
                  <td className="text-right">
                    <IconButton size="small">
                      <MoreVertical size={16} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={close}>
                      <MenuItem
                        onClick={(e) => handleClickOpen(selectedAppointmentId)}
                      >
                        View
                      </MenuItem>
                      <MenuItem onClick={close}>Delete</MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
        <Grid container justify="flex-end" className="p-2">
          <Pagination
            count={totalPage}
            page={page}
            onChange={(e, page) => setPage(page)}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const states: ReactStateDeclaration[] = [
  {
    url: "/transactions",
    name: "transactions",
    data: {
      title: "Transactions List",
      loggedIn: true,
    },
    component: Transactions,
  },
];
