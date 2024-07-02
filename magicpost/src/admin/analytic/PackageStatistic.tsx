import * as React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    InputLabel,
    Stack,
    LinearProgress,
    Box,
    Typography,
} from '@mui/material';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetList } from 'react-admin';
import CardWithIcon from './CardWithIcon';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloseIcon from '@mui/icons-material/Close';
const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;


import {
    startOfWeek,
    startOfMonth,
    startOfYear,
    format, subDays, addDays
} from 'date-fns';

const dateFormatter = (date: number): string =>
    new Date(date).toLocaleDateString();

function getDaysInMonth(month: any, year: any) {
    var date = new Date(year, month - 1, 1);
    var days = [];
    while (date.getMonth() === (month - 1)) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function getMonthsInYear(year: any) {
    var date = new Date(year, 0, 1);
    var months = [];
    while (date.getFullYear() === year) {
        months.push(new Date(date));
        date.setMonth(date.getMonth() + 1);
    }
    return months;
}
const aggregatePackageByDaySend = (pacs: any[]): { [key: string]: number } =>
    pacs
        .reduce((acc: any, curr: any) => {
            const day = format(new Date(curr.begin_date), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.packages.length;
            return acc;
        }, {} as { [key: string]: number });

const getTotalPerDaySend = (month: any, year: any, pacs: any): any[] => {
    const totalDays = aggregatePackageByDaySend(pacs);
    return getDaysInMonth(month, year).map(date => ({
        date: date.getTime(),
        count: totalDays[format(new Date(date), 'yyyy-MM-dd')] || 0,
    }));
};

const aggregatePackageByDayRecv = (pacs: any[]): { [key: string]: number } =>
    pacs
        .reduce((acc: any, curr: any) => {
            const day = format(new Date(curr.arrived_date), 'yyyy-MM-dd');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.packages.length;
            return acc;
        }, {} as { [key: string]: number });

const getTotalPerDayRecv = (month: any, year: any, pacs: any): any[] => {
    const totalDays = aggregatePackageByDayRecv(pacs);
    return getDaysInMonth(month, year).map(date => ({
        date: date.getTime(),
        count: totalDays[format(new Date(date), 'yyyy-MM-dd')] || 0,
    }));
};

const aggregatePackageByMonthSend = (pacs: any[]): { [key: string]: number } =>
    pacs
        .reduce((acc: any, curr: any) => {
            const day = format(new Date(curr.begin_date), 'yyyy-MM');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.packages.length;
            return acc;
        }, {} as { [key: string]: number });

const getTotalPerMonthSend = (year: any, pacs: any): any[] => {
    const totalDays = aggregatePackageByMonthSend(pacs);
    return getMonthsInYear(year).map(date => ({
        date: date.getTime(),
        count: totalDays[format(new Date(date), 'yyyy-MM')] || 0,
    }));
};

const aggregatePackageByMonthRecv = (pacs: any[]): { [key: string]: number } =>
    pacs
        .reduce((acc: any, curr: any) => {
            const day = format(new Date(curr.arrived_date), 'yyyy-MM');
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += curr.packages.length;
            return acc;
        }, {} as { [key: string]: number });

const getTotalPerMonthRecv = (year: any, pacs: any): any[] => {
    const totalDays = aggregatePackageByMonthRecv(pacs);
    return getMonthsInYear(year).map(date => ({
        date: date.getTime(),
        count: totalDays[format(new Date(date), 'yyyy-MM')] || 0,
    }));
};

const getTotal = (pacs: any) => {
    let total = 0;
    for (let i = 0; i < pacs.length; ++i) {
        total += pacs[i].packages.length;
    }
    return total
}

const PackageStatistic = (smallestYear: any) => {
    const [month, setMonth] = React.useState(0);
    const [curPoint, setCurPoint] = React.useState("0");
    const { data: pointList, isLoading: isLoadingP } = useGetList('points', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'reference', order: 'ASC' },
    });
    const [year, setYear] = React.useState((new Date()).getFullYear());
    var [filter, setFilter] = React.useState({
        begin_date_gt: (new Date("01/01/" + year.toString())).toISOString(),
        begin_date_lte: (new Date("01/01/" + (year + 1).toString())).toISOString(),
    });
    var [filter1, setFilter1] = React.useState({
        is_delivered: 1,
        arrived_date_gt: (new Date("01/01/" + year.toString())).toISOString(),
        arrived_date_lte: (new Date("01/01/" + (year + 1).toString())).toISOString(),
    });
    var [filter3, setFilter3] = React.useState({
        status: 'not-resolved',
    });
    var days = [];
    if (month !== 0) {
        days = getDaysInMonth(month, year);
    }
    var months = getMonthsInYear(year);

    const handlePointChange = (event: SelectChangeEvent) => {
        setCurPoint(event.target.value);
        if (event.target.value === 0) {
            if (filter.from_point_id) {
                delete filter.from_point_id;
            }
            setFilter({
                ...filter
            })
            if (filter1.dest_point_id) {
                delete filter1.dest_point_id;
            }
            setFilter1({
                ...filter1
            })
            if (filter3.from_point_id) {
                delete filter3.from_point_id;
            }
            setFilter3({
                ...filter3
            })
            return;
        }
        setFilter({
            ...filter,
            from_point_id: event.target.value,
        })
        setFilter1({
            ...filter1,
            is_delivered: 1,
            dest_point_id: event.target.value,
        })
        setFilter3({
            status: 'not-resolved',
            from_point_id: event.target.value,
        })
    }
    const handleMonthChange = (event: SelectChangeEvent) => {
        setMonth(parseInt(event.target.value));
        days = getDaysInMonth(parseInt(event.target.value), year);
        if (parseInt(event.target.value) !== 0) {
            if (parseInt(event.target.value) !== 12) {
                setFilter({
                    ...filter,
                    begin_date_gt: (new Date(`${event.target.value}/01/` + year.toString())).toISOString(),
                    begin_date_lte: (new Date(`${(parseInt(event.target.value) + 1).toString()}/01/` + (year).toString())).toISOString(),
                });
            }
            else {
                setFilter({
                    ...filter,
                    begin_date_gt: (new Date(`${event.target.value}/01/` + year.toString())).toISOString(),
                    begin_date_lte: (new Date(`01/01/` + (year + 1).toString())).toISOString(),
                });
            }
        }
        else {
            setFilter({
                ...filter,
                begin_date_gt: (new Date("01/01/" + year.toString())).toISOString(),
                begin_date_lte: (new Date("01/01/" + (year + 1).toString())).toISOString(),
            });
        }
        if (parseInt(event.target.value) !== 0) {
            if (parseInt(event.target.value) !== 12) {
                setFilter1({
                    ...filter1,
                    is_delivered: 1,
                    arrived_date_gt: (new Date(`${event.target.value}/01/` + year.toString())).toISOString(),
                    arrived_date_lte: (new Date(`${(parseInt(event.target.value) + 1).toString()}/01/` + (year).toString())).toISOString(),
                });
            }
            else {
                setFilter1({
                    ...filter1,
                    is_delivered: 1,
                    arrived_date_gt: (new Date(`${event.target.value}/01/` + year.toString())).toISOString(),
                    arrived_date_lte: (new Date(`01/01/` + (year + 1).toString())).toISOString(),
                });
            }
        }
        else {
            setFilter1({
                ...filter1,
                is_delivered: 1,
                arrived_date_gt: (new Date("01/01/" + year.toString())).toISOString(),
                arrived_date_lte: (new Date("01/01/" + (year + 1).toString())).toISOString(),
            });
        }
    }
    const handleYearChange = (event: SelectChangeEvent) => {
        setYear(parseInt(event.target.value));
        months = getMonthsInYear(parseInt(event.target.value));
        if (month !== 0) {
            if (parseInt(event.target.value) !== 12) {
                setFilter({
                    ...filter,
                    begin_date_gt: (new Date(`${month.toString()}/01/` + parseInt(event.target.value).toString())).toISOString(),
                    begin_date_lte: (new Date(`${(month + 1).toString()}/01/` + (parseInt(event.target.value)).toString())).toISOString(),
                });
            }
            else {
                setFilter({
                    ...filter,
                    begin_date_gt: (new Date(`${month.toString()}/01/` + parseInt(event.target.value).toString())).toISOString(),
                    begin_date_lte: (new Date(`01/01/` + (parseInt(event.target.value) + 1).toString())).toISOString(),
                });
            }
        }
        else {
            setFilter({
                ...filter,
                begin_date_gt: (new Date("01/01/" + parseInt(event.target.value).toString())).toISOString(),
                begin_date_lte: (new Date("01/01/" + (parseInt(event.target.value) + 1).toString())).toISOString(),
            });
        }
        if (month !== 0) {
            if (parseInt(event.target.value) !== 12) {
                setFilter1({
                    ...filter1,
                    is_delivered: 1,
                    arrived_date_gt: (new Date(`${month.toString()}/01/` + parseInt(event.target.value).toString())).toISOString(),
                    arrived_date_lte: (new Date(`${(month + 1).toString()}/01/` + (parseInt(event.target.value)).toString())).toISOString(),
                });
            }
            else {
                setFilter1({
                    ...filter1,
                    is_delivered: 1,
                    arrived_date_gt: (new Date(`${month.toString()}/01/` + parseInt(event.target.value).toString())).toISOString(),
                    arrived_date_lte: (new Date(`01/01/` + (parseInt(event.target.value) + 1).toString())).toISOString(),
                });
            }
        }
        else {
            setFilter1({
                ...filter1,
                is_delivered: 1,
                arrived_date_gt: (new Date("01/01/" + parseInt(event.target.value).toString())).toISOString(),
                arrived_date_lte: (new Date("01/01/" + (parseInt(event.target.value) + 1).toString())).toISOString(),
            });
        }
    }
    const { data: curPackageSend, isLoading: isLoading } = useGetList('delivery',
        {
            filter: filter,
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });
    const { data: curPackageReceive, isLoading: isLoading1 } = useGetList('delivery',
        {
            filter: filter1,
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });

    const { data: curPackageSending, isLoading: isLoading3 } = useGetList('delivery',
        {
            filter: filter3,
            pagination: {
                page: 1,
                perPage: 100000,
            }
        });

    var arr = [];

    for (let i = smallestYear.smallestYear; i <= (new Date()).getFullYear(); ++i) {
        arr.push(i);
    }
    if (isLoadingP) {
        return (
            <></>
        );
    }
    return (
        <>
            <Card>
                <CardHeader title="Thống kê hàng" />
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <InputLabel id="month-label">Tháng</InputLabel>
                        <Select
                            labelId='month-label'
                            value={month.toString()}
                            label="Tháng"
                            onChange={handleMonthChange}
                            disabled={isLoading || isLoading1 || isLoading3}
                        >
                            <MenuItem value={0}>Không xét tháng</MenuItem>
                            <MenuItem value={1}>Tháng 1</MenuItem>
                            <MenuItem value={2}>Tháng 2</MenuItem>
                            <MenuItem value={3}>Tháng 3</MenuItem>
                            <MenuItem value={4}>Tháng 4</MenuItem>
                            <MenuItem value={5}>Tháng 5</MenuItem>
                            <MenuItem value={6}>Tháng 6</MenuItem>
                            <MenuItem value={7}>Tháng 7</MenuItem>
                            <MenuItem value={8}>Tháng 8</MenuItem>
                            <MenuItem value={9}>Tháng 9</MenuItem>
                            <MenuItem value={10}>Tháng 10</MenuItem>
                            <MenuItem value={11}>Tháng 11</MenuItem>
                            <MenuItem value={12}>Tháng 12</MenuItem>
                        </Select>
                        <InputLabel id="year-label">Năm</InputLabel>
                        <Select
                            labelId='year-label'
                            value={year.toString()}
                            label="Năm"
                            onChange={handleYearChange}
                            disabled={isLoading || isLoading1 || isLoading3}
                        >
                            {arr.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputLabel id="point-label">Điểm</InputLabel>
                        <Select
                            labelId='point-label'
                            value={curPoint}
                            label="Năm"
                            onChange={handlePointChange}
                            disabled={isLoading || isLoading1 || isLoading3}
                        >
                            <MenuItem value={0}>Toàn quốc</MenuItem>
                            {pointList.map((point) => (
                                <MenuItem key={point.reference} value={point.reference}>
                                    {point.reference}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Separator />
                    {isLoading || isLoading1 || isLoading3 ? (
                        <LinearProgress />
                    ) :
                        (
                            <>
                                <Stack direction="row" spacing={2}>
                                    <SendCard value={getTotal(curPackageSend)} />
                                    <ReceiveCard value={getTotal(curPackageReceive)} />
                                    <SendingCard value={getTotal(curPackageSending)} />
                                </Stack>
                                <Typography variant="h6" gutterBottom>
                                    {`Thống kê hàng gửi ${(curPoint !== "0" && curPoint !== 0) ? "tại " + curPoint : "toàn quốc"} ${month !== 0 ? month.toString() + '/' + year.toString() : year.toString()}`}
                                </Typography>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={month !== 0 ? getTotalPerDaySend(month, year, curPackageSend) : getTotalPerMonthSend(year, curPackageSend)}>
                                            <defs>
                                                <linearGradient
                                                    id="colorUv"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="#8884d8"
                                                        stopOpacity={0.8}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="#8884d8"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="date"
                                                name="Date"
                                                type="number"
                                                scale="time"
                                                domain={month !== 0 ? [
                                                    days[0].getTime(),
                                                    days[days.length - 1].getTime(),
                                                ] : [
                                                    months[0].getTime(),
                                                    months[months.length - 1].getTime(),
                                                ]}
                                                tickFormatter={dateFormatter}
                                            />
                                            <YAxis dataKey="count" name="Tổng hàng" />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip
                                                cursor={{ strokeDasharray: '3 3' }}
                                                formatter={(value: any) =>
                                                    value.toString() + " hàng gửi"
                                                }
                                                labelFormatter={(label: any) =>
                                                    dateFormatter(label)
                                                }
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                fill="url(#colorUv)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <Typography variant="h6" gutterBottom>
                                    {`Thống kê hàng nhận ${(curPoint !== "0" && curPoint !== 0) ? "tại " + curPoint : "toàn quốc"} ${month !== 0 ? month.toString() + '/' + year.toString() : year.toString()}`}
                                </Typography>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={month !== 0 ? getTotalPerDayRecv(month, year, curPackageReceive) : getTotalPerMonthRecv(year, curPackageReceive)}>
                                            <defs>
                                                <linearGradient
                                                    id="colorUv"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="#8884d8"
                                                        stopOpacity={0.8}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="#8884d8"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="date"
                                                name="Date"
                                                type="number"
                                                scale="time"
                                                domain={month !== 0 ? [
                                                    days[0].getTime(),
                                                    days[days.length - 1].getTime(),
                                                ] : [
                                                    months[0].getTime(),
                                                    months[months.length - 1].getTime(),
                                                ]}
                                                tickFormatter={dateFormatter}
                                            />
                                            <YAxis dataKey="count" name="Tổng hàng" />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip
                                                cursor={{ strokeDasharray: '3 3' }}
                                                formatter={(value: any) =>
                                                    value.toString() + " hàng nhận"
                                                }
                                                labelFormatter={(label: any) =>
                                                    dateFormatter(label)
                                                }
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#8884d8"
                                                strokeWidth={2}
                                                fill="url(#colorUv)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        )
                    }

                </CardContent>
            </Card>
        </>
    );
};

interface PropsSend {
    value?: number;
}
const SendCard = (props: PropsSend) => {
    const { value } = props;
    return (
        <CardWithIcon
            icon={SendIcon}
            title={"Tổng hàng gửi"}
            subtitle={value}
        />
    );
}

const ReceiveCard = (props: PropsSend) => {
    const { value } = props;
    return (
        <CardWithIcon
            icon={CallReceivedIcon}
            title={"Tổng hàng nhận"}
            subtitle={value}
        />
    );
}

const SendingCard = (props: PropsSend) => {
    const { value } = props;
    return (
        <CardWithIcon
            icon={LocalShippingIcon}
            title={"Tổng hàng đang gửi"}
            subtitle={value}
        />
    );
}

const FailCard = (props: PropsSend) => {
    const { value } = props;
    return (
        <CardWithIcon
            icon={CloseIcon}
            title={"Tổng hàng lỗi"}
            subtitle={value}
        />
    );
}
const Separator = () => <Box pt="1em" />;
export default PackageStatistic;