import React from "react";
import { Grid } from "material-ui";

import { RegularCard, Table, ItemGrid } from "./components";

function Log({ ...props }) {
    return (
        <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    headerColor="green"
                    cardTitle="Escrow"
                    cardSubtitle="Organizations with locked funds"
                    content={
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Organization", "Country", "City", "Amount"]}
                            tableData={[

                                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                            ]}
                        />
                    }
                />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    cardTitle="Containers in transit"
                    headerColor="orange"
                    cardSubtitle="Vendors in possesion of containers"
                    content={
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["Organization", "Country", "City", "Amount"]}
                            tableData={[
                                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],

                                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                            ]}
                        />
                    }
                />
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={12}>
                <RegularCard
                    headerColor="blue"
                    cardTitle="Pending"
                    cardSubtitle="Actionable containers"
                    content={
                        <Table id="pablo"
                            tableHeaderColor="primary"
                            tableHead={["Organization", "Country", "City", "Amount"]}
                            tableData={[
                                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],

                            ]}
                        />
                    }
                />
            </ItemGrid>
        </Grid>
    );
}

export default Log;