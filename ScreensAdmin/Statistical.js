import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StatisticalScreen = () => {
    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: ['12/4', '13/4', '14/4', '15/4', '16/4', '17/4', '18/4', '19/4', '20/4', '21/4', '22/4', '23/4', '24/4', '25/4'],
        datasets: [
            {
                data: [500, 600, 700, 800, 900, 1000, 750, 650, 800, 950, 1050, 111, 700, 900],
                color: () => `#4CAF50`, // Màu xanh
            },
        ],
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { /* Logic quay lại màn hình trước */ }}>
                    <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Statistical</Text>
            </View>

            {/* Phần chọn ngày và tổng chi tiêu */}
            <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.dateRange}>
                    <Text style={styles.dateText}>12-2-2024 - 25-5-2024</Text>
                </TouchableOpacity>
                <Text style={styles.totalSpent}>Tổng chi tiêu: 4000000000 đ</Text>
            </View>

            {/* Biểu đồ */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 30}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#FFFFFF',
                        backgroundGradientTo: '#FFFFFF',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#4CAF50',
                        },
                    }}
                    bezier
                    style={styles.chart}
                />
            </ScrollView>

            {/* Top doanh thu và nút lọc */}
            <View style={styles.topRevenueContainer}>
                <Text style={styles.topRevenueTitle}>Top doanh thu</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Image source={require('../acssets/filter1.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Danh sách thông tin */}
            <ScrollView style={styles.infoContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <View key={index} style={styles.infoBox}>
                        <Text style={styles.infoText}>Hiện thông tin</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    icon: {
        width: 24,
        height: 24,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dateRange: {
        backgroundColor: '#FFF5E5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
    totalSpent: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        marginHorizontal: 15,
    },
    topRevenueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    topRevenueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    filterButton: {
        padding: 8,
    },
    infoContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    infoBox: {
        backgroundColor: '#B3E5FC',
        borderRadius: 8,
        padding: 20,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default StatisticalScreen;
