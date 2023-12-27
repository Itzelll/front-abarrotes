import { StyleSheet } from '@react-pdf/renderer';
import { Page, Text, View, Document } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: 'table',
        width: '90%',
        borderStyle: 'none',
        borderWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        textAlign: 'center'
    },
    tableRow: { margin: 'auto', flexDirection: 'row', textAlign: 'center' },
    tableColHeader: {
        width: '20%',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        backgroundColor: '#F0F0F0', // Background color removed
        textAlign: 'center',
        fontWeight: 'bold', // Bold headers
    },
    tableCol: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 12,
    },
});

//  import { pdfStyles } from './styleAbarrotes';

export const SalesReportPDF = ({ salesData }) => (
    <Document>
        <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.section}>
                <View style={pdfStyles.table}>
                    <View style={pdfStyles.tableRow}>
                        <View style={pdfStyles.tableColHeader}>
                            <Text>Cantidad</Text>
                        </View>
                        <View style={pdfStyles.tableColHeader}>
                            <Text>Código Producto</Text>
                        </View>
                        <View style={pdfStyles.tableColHeader}>
                            <Text>Producto</Text>
                        </View>
                        <View style={pdfStyles.tableColHeader}>
                            <Text>Precio Unitario</Text>
                        </View>
                        <View style={pdfStyles.tableColHeader}>
                            <Text>Subtotal</Text>
                        </View>
                    </View>
                    {salesData.map((sale) => (
                        <View key={sale.id} style={pdfStyles.tableRow}>
                            <View style={pdfStyles.tableCol}>
                                <Text>{sale.cantidad}</Text>
                            </View>
                            <View style={pdfStyles.tableCol}>
                                <Text>{sale.producto}</Text>
                            </View>
                            <View style={pdfStyles.tableCol}>
                                <Text>{sale.nombre}</Text>
                            </View>
                            <View style={pdfStyles.tableCol}>
                                <Text>{sale.precioUnitario}</Text>
                            </View>
                            <View style={pdfStyles.tableCol}>
                                <Text>{sale.subtotal}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);