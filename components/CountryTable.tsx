import { Table } from "@mantine/core";



const CountryTable = ({ data }: { data: any }) => {
    const rows = data.map((curCountry) => (
        <tr key={curCountry.name}>
            <td>{curCountry.name}</td>
            <td>{curCountry.num_events}</td>
        </tr>
    ));
    return (
        <div>
            <Table striped highlightOnHover>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}

export default CountryTable;