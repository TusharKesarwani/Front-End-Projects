document.addEventListener('DOMContentLoaded', () => {
    const savings = JSON.parse(localStorage.getItem('savings')) || {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (Object.keys(savings).length === 0) {
        alert("No savings data available to analyze.");
        return;
    }

    const savingsData = processSavingsData(savings);
    populateSavingsTable(savingsData);

    const monthlyPieCtx = document.getElementById('monthly-pie-chart').getContext('2d');
    const yearlyPieCtx = document.getElementById('yearly-pie-chart').getContext('2d');
    const barCtx = document.getElementById('savings-bar-chart').getContext('2d');
    const lineCtx = document.getElementById('savings-line-chart').getContext('2d');

    new Chart(monthlyPieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(savingsData.monthly).map(key => {
                const [year, month] = key.split('-');
                return `${monthNames[month - 1]} ${year}`;
            }),
            datasets: [{
                data: Object.values(savingsData.monthly),
                backgroundColor: generateColors(Object.keys(savingsData.monthly).length)
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 20,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += `Rs. ${context.raw}`;
                            return label;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value, context) => {
                        return context.chart.data.labels[context.dataIndex].replace(' ', '\n') + `\nRs. ${value}`;
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        }
    });

    new Chart(yearlyPieCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(savingsData.yearly),
            datasets: [{
                data: Object.values(savingsData.yearly),
                backgroundColor: generateColors(Object.keys(savingsData.yearly).length)
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 20,
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += `Rs. ${context.raw}`;
                            return label;
                        }
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    formatter: (value, context) => {
                        const year = context.chart.data.labels[context.dataIndex];
                        return `${year}\nRs. ${value}`;
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        }
    });

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(savingsData.monthly).map(key => {
                const [year, month] = key.split('-');
                return `${monthNames[month - 1]} ${year}`;
            }),
            datasets: [{
                label: 'Monthly Savings (Rs)',
                data: Object.values(savingsData.monthly),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rs. ' + value;
                        }
                    }
                }
            }
        }
    });

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: savingsData.dates,
            datasets: [{
                label: 'Savings Over Time (Rs)',
                data: savingsData.amounts,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rs. ' + value;
                        }
                    }
                }
            }
        }
    });

    document.getElementById('download-pdf').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        doc.text('My Savings Analysis', 10, 10);

        const barChartCanvas = document.getElementById('savings-bar-chart');
        const pieChartCanvas1 = document.getElementById('monthly-pie-chart');
        const pieChartCanvas2 = document.getElementById('yearly-pie-chart');
        const lineChartCanvas = document.getElementById('savings-line-chart');
        const tableElement = document.querySelector('.data-table'); // Capture the data table element

        const imgWidth = 85;
        const imgHeight = 55;
        const margin = 10;
        const initialY = 20;

        doc.addImage(pieChartCanvas1.toDataURL('image/png'), 'PNG', 10, initialY, imgWidth, imgHeight);
        doc.addImage(pieChartCanvas2.toDataURL('image/png'), 'PNG', 105, initialY, imgWidth, imgHeight);

        doc.addImage(barChartCanvas.toDataURL('image/png'), 'PNG', 10, initialY + imgHeight + margin, imgWidth * 2 + margin, imgHeight);

        doc.addImage(lineChartCanvas.toDataURL('image/png'), 'PNG', 10, initialY + imgHeight * 2 + margin * 2, imgWidth * 2 + margin, imgHeight);

        // Capture the table and add to the PDF
        html2canvas(tableElement).then(canvas => {
            const tableImgData = canvas.toDataURL('image/png');
            doc.addPage();
            doc.addImage(tableImgData, 'PNG', 10, 10, 190, 0); // Adjust the width and let height scale automatically
            doc.save('my_savings_analysis.pdf');
        });
    });

    document.getElementById('back-button').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function processSavingsData(savings) {
        const yearlySavings = {};
        const monthlySavings = {};

        for (const date in savings) {
            const [year, month, day] = date.split('-').map(Number);
            const amount = parseFloat(savings[date]);

            const yearKey = year;
            const monthKey = `${year}-${month}`;

            if (!yearlySavings[yearKey]) {
                yearlySavings[yearKey] = 0;
            }
            if (!monthlySavings[monthKey]) {
                monthlySavings[monthKey] = 0;
            }

            yearlySavings[yearKey] += amount;
            monthlySavings[monthKey] += amount;
        }

        return {
            yearly: yearlySavings,
            monthly: monthlySavings,
            dates: Object.keys(savings),
            amounts: Object.values(savings).map(parseFloat)
        };
    }

    function populateSavingsTable(savingsData) {
        const dataTableBody = document.querySelector("#savings-data-table tbody");

        Object.keys(savingsData.yearly).forEach(year => {
            const row = document.createElement("tr");

            const yearCell = document.createElement("td");
            yearCell.textContent = year;
            row.appendChild(yearCell);

            let yearlyTotal = 0;
            for (let month = 1; month <= 12; month++) {
                const monthKey = `${year}-${month}`;
                const monthCell = document.createElement("td");

                if (savingsData.monthly[monthKey]) {
                    monthCell.textContent = `Rs. ${savingsData.monthly[monthKey]}`;
                    yearlyTotal += savingsData.monthly[monthKey];
                } else {
                    monthCell.textContent = '';
                }
                row.appendChild(monthCell);
            }

            const totalCell = document.createElement("td");
            totalCell.textContent = `Rs. ${yearlyTotal}`;
            row.appendChild(totalCell);

            dataTableBody.appendChild(row);
        });
    }

    function generateColors(length) {
        const colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(`hsl(${i * (360 / length)}, 70%, 60%)`);
        }
        return colors;
    }
});
