import PageHeader from "../components/header";
import React, {useState, useEffect, useRef} from "react";
import { Provider, themeDovzhenko, themePodil } from "koval-ui";
import { Page, Content, Sidebar, Main, Footer, DataTable } from "koval-ui";
import styles from "./testpage.module.css";
//import TestPageCode from "./testpage.module.js";
export default function TestPage() {

  const useWebSocket = (url : string) => {
    const isConnected = useRef(false);
    const socket  = useRef<WebSocket | null>(null);
    const [message, setMessage] = useState([
      {
        ticker: 'AAPL',
        companyName: 'Apple Inc.',
        price: 150.00,
        currency: 'USD',
        marketCap: 2.5e12,
        volume: 1000000,
        sector: 'Technology',
        peRatio: 28.5,
        dividendYield: 0.6
      },
      {
        ticker: 'GOOGL',
        companyName: 'Alphabet Inc.',
        price: 2800.00,
        currency: 'USD',
        marketCap: 1.8e12,
        volume: 500000,
        sector: 'Technology',
        peRatio: 30.2,
        dividendYield: 0.0
      },
      {
        ticker: 'AMZN',
        companyName: 'Amazon.com Inc.',
        price: 3400.00,
        currency: 'USD',
        marketCap: 1.7e12,
        volume: 800000,
        sector: 'Consumer Discretionary',
        peRatio: 60.1,
        dividendYield: 0.0
      }
  
    ]);

    
    useEffect(() => {
      if (!isConnected.current) {
        socket.current = new WebSocket(url);
        
        socket.current.onopen = () => {
          console.log('WebSocket connection established');
          isConnected.current = true;
        };

        socket.current.onmessage = (event : any) => {
          console.log('WebSocket message received:', event.data);
          setMessage(JSON.parse(event.data));
        };

        socket.current.onerror = (error : any) => {
          console.error('WebSocket error:', error);
          isConnected.current = false;
        };

        socket.current.onclose = () => {
          console.log('WebSocket connection closed');
          isConnected.current = false;
        };
      }
    }, [url]);
    return message;
  }
  
  return (
    <Provider theme={themePodil}>
      <Page className={styles.pageEdit}>
          <React.Fragment key="0.1">
            <PageHeader />
            <Content>
              <Main>
                <center>
                <DataTable
                  className={styles.dataTable}
                  tableHeight={"full"}
                  renderMode="paginated"
                  columns={[
                    {
                      accessorKey: 'ticker',
                      id: 'ticker',
                      name: 'Ticker',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'companyName',
                      id: 'companyName',
                      name: 'Company Name',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'price',
                      id: 'price',
                      name: 'Price',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'change',
                      id: 'change',
                      name: 'Change',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'percentageChange',
                      id: 'percentageChange',
                      name: 'Percentage Change',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'high',
                      id: 'high',
                      name: 'High Price',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'low',
                      id: 'low',
                      name: 'Low Price',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'open',
                      id: 'open',
                      name: 'Open Price',
                      sortingFn: 'alphanumeric',
                    },
                    {
                      accessorKey: 'previousClose',
                      id: 'previousClose',
                      name: 'Previous Close',
                      sortingFn: 'alphanumeric',
                    }
                  ]}
                  
                  tableData={useWebSocket("ws://localhost:443")}>

                </DataTable>
                </center>
              </Main>
            </Content>
            <Footer>

            </Footer>
          </React.Fragment>
      </Page>
    </Provider>
  );
}

