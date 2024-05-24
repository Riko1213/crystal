'use client'

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Нийт орлого',
            digit: 0,
        },
        products: {
            label: 'Бараанууд',
            digit: 0,
        },
        orders: {
            label: 'Захиалгууд',
            digit: 0,
        },
        paidOrders: {
            label: 'Төлсөн тоо',
            digit: 0,
        },
        unpaidOrders: {
            label: 'Төлөөгүй тоо',
            digit: 0,
        },
        users: {
            label: 'хэрэглэгчид',
            digit: 0,
        },
    });

    const [dateRange, setDateRange] = useState<any>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = { ...prev };

            const filteredOrders = orders.filter((order) => {
                const orderDate = new Date(order.createDate);
                return orderDate >= dateRange[0].startDate && orderDate <= dateRange[0].endDate;
            });

            const totalSale = filteredOrders.reduce((acc, item) => {
                if (item.deliveryStatus === 'delivered') {
                    return acc + item.amount;
                } else return acc;
            }, 0);

            const paidOrders = filteredOrders.filter((order) => {
                return order.deliveryStatus === 'delivered';
            });

            const unpaidOrders = filteredOrders.filter((order) => {
                return order.deliveryStatus === 'dispatched';
            });

            tempData.sale.digit = totalSale / 100;
            tempData.orders.digit = filteredOrders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData;
        });
    }, [orders, products, users, dateRange]);

    const summaryKeys = Object.keys(summaryData);

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Heading title="Stats" center />
            </div>
            <div className="mb-4">
                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {summaryKeys &&
                    summaryKeys.map((key) => {
                        return (
                            <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                                <div className="text-xl md:text-4xl font-bold">
                                    {summaryData[key].label === 'Нийт орлого' ? (
                                        <>{formatPrice(summaryData[key].digit)}</>
                                    ) : (
                                        <>{formatNumber(summaryData[key].digit)}</>
                                    )}
                                </div>
                                <div>{summaryData[key].label}</div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Summary;
