import React, { useState, useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useAuth } from '../../context/AuthContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

function Statistics() {
    const { currentUser } = useAuth()
    const [barData, setBarData] = useState({
        labels: ["Sales", "Expenses"],
        datasets: [{
            label: "Euros",
            data: [0, 0],
            backgroundColor: ["#0C8CE9", "#E9590C"]
        }]
    })
    const [pieData, setPieData] = useState({
        labels: [""],
        datasets: [{
            label: "Euros",
            data: [0],
            backgroundColor: ["#2eb8ac", "#7cd164", "#e6d839", "#e84b2c", "#2f2e30"]
        }]
    })
    const [lineData, setLineData] = useState({
        labels: [""],
        datasets: [{
            label: "Euros",
            data: [""],
            backgroundColor: ["#0C8CE9"]
        }]
    })

    useEffect(() => {
        const date = new Date()
        const getStatistics = () => {
            const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/statistics`),
                (snapshot) => {
                    if (snapshot.size > 0) {
                        let lineLabels = [];
                        let lineValues = [];
                        snapshot.docs.map(doc => {
                            lineLabels.push(doc.id)
                            lineValues.push(doc.data().sales)
                            if (doc.id === `${date.getMonth() + 1}-${date.getFullYear()}`) {
                                setBarData({
                                    labels: ["Sales", "Expenses"],
                                    datasets: [{
                                        label: "Euros",
                                        data: [doc.data().sales, doc.data().expenses],
                                        backgroundColor: ["#0C8CE9", "#E9590C"]
                                    }]
                                })
                                setPieData({
                                    labels: Object.keys(doc.data().expensesByCategory),
                                    datasets: [{
                                        label: "Euros",
                                        data: Object.values(doc.data().expensesByCategory),
                                        backgroundColor: ["#2eb8ac", "#7cd164", "#e6d839", "#e84b2c", "#2f2e30"]
                                    }]
                                })
                            }
                        });
                        setLineData({
                            labels: lineLabels,
                            datasets: [{
                                label: "Euros",
                                data: lineValues,
                                backgroundColor: ["#0C8CE9"]
                            }]
                        })
                    }
                })
            return unsub;
        }
        currentUser.uid && getStatistics()
    }, [currentUser.uid])

    return (
        <div className="statistics-page">
            <div className="statistics-chart">
                {barData &&
                    <>
                        <h2>Sales vs Expenses</h2>
                        <Bar data={barData} />
                    </>
                }
            </div>
            <div className="statistics-chart">
                {pieData &&
                    <>
                        <h2>Expenses by category</h2>
                        <Pie data={pieData} />
                    </>
                }
            </div>
            <div className="statistics-chart">
                {lineData &&
                    <>
                        <h2>Sales index</h2>
                        <Line data={lineData} />
                    </>
                }
            </div>
        </div>
    )
}

export default Statistics