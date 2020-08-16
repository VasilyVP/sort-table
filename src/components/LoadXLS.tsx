import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import readXlsx from 'read-excel-file'
import { setTableData } from '../actions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        div: {
            marginTop: '20px',
            marginBottom: '20px',
        },
        input: {
            display: 'none',
        },
    }),
);

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const input = document.getElementById('contained-button-file') as HTMLInputElement;

        const listener = async () => {
            if (input.files) {
                const rows = await readXlsx(input.files[0]);
                dispatch(setTableData(rows));
            }
        };
        input.addEventListener('change', listener);

        return () => input.removeEventListener('change', listener);
    });


    return (
        <div className={classes.div}>
            <input
                accept=".xlsx"
                className={classes.input}
                id="contained-button-file"
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    )
}