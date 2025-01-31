import SiteMinderRoomModel from "./roomModels"
import GetRoomAvailabilityFromSiteMinder from "./api"
import axios from "axios"
import { useState, useEffect } from "react"
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, toZonedTime } from 'date-fns-tz';

const Seperator = styled.hr`
    width: 100%
`
const TDContent = styled.td`
    background:rgb(179, 179, 201);
    padding: 5px;
    font-weight: 480
`

const TDDate = styled.td`
    background:rgb(214, 203, 200);
    padding: 7px
`

const ContentWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
`

const Report = styled.div`
    margin: 10px;
`

const FunctionButton = styled.button`
    margin: 5px;
    border-radius: 25%;
    cursor:pointer;
`


export default function CompareTable () {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [cookies, setCookies] = useState('');

    const [report, setReport] = useState<String[]>([]);

    const [supDoub, setSupDoub] = useState<SiteMinderRoomModel[]>([]);

    const [supTwin, setSupTwin] = useState<SiteMinderRoomModel[]>([]);

    const [dexDoub, setDexDoub] = useState<SiteMinderRoomModel[]>([]);

    const [dexTwin, setDexTwin] = useState<SiteMinderRoomModel[]>([]);

    const [supDexDoub, setSupDexDoub] = useState<SiteMinderRoomModel[]>([]);

    const [supDexTwin, setSupDexTwin] = useState<SiteMinderRoomModel[]>([]);

    const [luxury, setLuxury] = useState<SiteMinderRoomModel[]>([]);
    const [luxury2, setLuxury2] = useState<SiteMinderRoomModel[]>([]);

    const [family, setFamily] = useState<SiteMinderRoomModel[]>([]);
    const [family2, setFamily2] = useState<SiteMinderRoomModel[]>([]);

    const roomArray = [{name: "Superior Double",room: supDoub}, {name: "Superior Twin",room: supTwin}, {name: "Deluxe Double",room: dexDoub},{name: "Deluxe Twin",room: dexTwin},{name: "Super Deluxe Double",room: supDexDoub},{name: "Super Deluxe Twin",room: supDexTwin}]

    const roomReport = [{id: 1,name: "Superior Double",room: supDoub}, {id: 2, name: "Superior Twin",room: supTwin}, {id: 3, name: "Deluxe Double",room: dexDoub},{id: 4, name: "Deluxe Twin",room: dexTwin},{id: 5, name: "Super Deluxe Double",room: supDexDoub},{id: 6, name: "Super Deluxe Twin",room: supDexTwin}]


    const generateReport = () => {
        let tempArray: string[] = [];

        for (let index = 0; index < 14; index++){
            roomReport.forEach(item => {
                if (item.room[index].priceValidation === false){
                    if (item.room[index].season === "low"){
                        
                        if (item.room[index].barPrice === 1){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", occ < 20%)")
                        }
                        else if (item.room[index].barPrice === 2){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 20% <= occ < 40%)")
                        }
                        else if (item.room[index].barPrice === 3){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 40% <= occ < 60%)")
                        }
                        else if (item.room[index].barPrice === 4){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 60% <= occ < 80%)")
                        }
                        else if (item.room[index].barPrice === 5){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 80% <= occ)")
                            console.log(item.room[index].date)
                    }}
                    else
                    {
                        if (item.room[index].barPrice === 5){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", occ < 20%)")
                        }
                        else if (item.room[index].barPrice === 6){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 20% <= occ < 40%)")
                        }
                        else if (item.room[index].barPrice === 7){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 40% <= occ < 60%)")
                        }
                        else if (item.room[index].barPrice === 8){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 60% <= occ < 80%)")
                        }
                        else if (item.room[index].barPrice === 9){
                            tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (" + item.room[index].season + " season" + ", 80% <= occ)")
                            console.log(item.room[index].date)
                        }}

                    // else if (item.id === 3 || item.id === 4){
                    //     if (item.room[index].barPrice === 1){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (avai >= 10)")
                    //     }
                    //     else if (item.room[index].barPrice === 2){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (7 <= avai < 10)")
                    //     }
                    //     else if (item.room[index].barPrice === 3){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (4 <= avai < 7)")
                    //     }
                    //     else if (item.room[index].barPrice === 4){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (avai < 4)")
                    //     }
                    //     else if (item.room[index].barPrice === 5){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy') + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (50% < occ <= 60%)")
                    //     }
                    //     else if (item.room[index].barPrice === 6){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (60% < occ <= 70%)")
                    //     }
                    //     else if (item.room[index].barPrice === 7){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (70% < occ <= 80%)")
                    //     }
                    //     else if (item.room[index].barPrice === 8){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (80% < occ)")
                    //     }
                    //     else if (item.room[index].barPrice === 9){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (80% < occ)")
                    //     }
                    // }

                    // else if (item.id === 5 || item.id === 6){
                    //     if (item.room[index].barPrice === 1){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (avai >= 13)")
                    //     }
                    //     else if (item.room[index].barPrice === 2){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (9 <= avai < 13)")
                    //     }
                    //     else if (item.room[index].barPrice === 3){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (5 <= avai < 9)")
                    //     }
                    //     else if (item.room[index].barPrice === 4){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (avai < 5)")
                    //     }
                    //     else if (item.room[index].barPrice === 5){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (50% < occ <= 60%)")
                    //     }
                    //     else if (item.room[index].barPrice === 6){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (60% < occ <= 70%)")
                    //     }
                    //     else if (item.room[index].barPrice === 7){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (70% < occ <= 80%)")
                    //     }
                    //     else if (item.room[index].barPrice === 8){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (80% < occ)")
                    //     }
                    //     else if (item.room[index].barPrice === 8){
                    //         tempArray.push(format(toZonedTime(item.room[index].date, 'Asia/Ho_Chi_Minh'), 'dd/MM/yyyy')  + ": " + item.name + " => " + "bar " + item.room[index].barPrice + " (80% < occ)")
                    //     }
                    // }
                }
            })
        }

        setReport(tempArray);
    }

    const getRoomInventory= (id: any) =>{
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        axios.get(`https://lalunasyncapi-cybddje8fkbsc6ad.centralus-01.azurewebsites.net/siteminderavailability?id=${id}&date=${formattedDate}&cookies=${cookies}`)
        .then(response => {
            if (id === 1)
                setSupDoub(response.data)  
            if (id === 2)
                setSupTwin(response.data)
            if (id === 3)
                setDexDoub(response.data)
            if (id === 4)
                setDexTwin(response.data)
            if (id === 5)
                setSupDexDoub(response.data)
            if (id === 6)
                setSupDexTwin(response.data)
            if (id === 7) 
                setLuxury(response.data)
            if (id === 8) 
                setLuxury2(response.data)
            if (id === 9) 
                setFamily(response.data)
            if (id === 10) 
                setFamily2(response.data)

        })
        .catch(error => {
            window.alert(error);
        })
    };

    const LoadInventory = (event) => {

        if (cookies){
            event.preventDefault();
            setReport([]);
            getRoomInventory(1);
            getRoomInventory(2);
            getRoomInventory(3);
            getRoomInventory(4);
            getRoomInventory(5);
            getRoomInventory(6);
            getRoomInventory(7);
            getRoomInventory(8);
            getRoomInventory(9);
            getRoomInventory(10);
        }
        else{
            window.alert('Please input cookies');
        }

        
    }

    

    const validateBarPriceDetail = (id, roomRate, barPrice) => {
        if (id === 1 || id === 2){
            switch(barPrice) {
                case 1:
                    return roomRate >= 4230000;
                case 2:
                    return roomRate >= 4400000;
                case 3:
                    return roomRate >= 4570000;
                case 4:
                    return roomRate >= 4730000;
                case 5:
                    return roomRate >= 4900000;
                case 6:
                    return roomRate >= 5070000;
                case 7:
                    return roomRate >= 5240000;
                case 8:
                    return roomRate >= 5410000;
                case 9:
                    return roomRate >= 5580000;
                case 10:
                    return roomRate >= 5750000;
            }
        }
        else if (id === 3 || id === 4){
            switch(barPrice) {
                case 1:
                    return roomRate >= 4570000;
                case 2:
                    return roomRate >= 4730000;
                case 3:
                    return roomRate >= 4900000;
                case 4:
                    return roomRate >= 5070000;
                case 5:
                    return roomRate >= 5240000;
                case 6:
                    return roomRate >= 5410000;
                case 7:
                    return roomRate >= 5580000;
                case 8:
                    return roomRate >= 5750000;
                case 9:
                    return roomRate >= 5920000;
                case 10:
                    return roomRate >= 6090000;
            }
        }
        else if (id === 5 || id === 6){
            switch(barPrice) {
                case 1:
                    return roomRate >= 4990000;
                case 2:
                    return roomRate >= 5160000;
                case 3:
                    return roomRate >= 5330000;
                case 4:
                    return roomRate >= 5500000;
                case 5:
                    return roomRate >= 5510000;
                case 6:
                    return roomRate >= 5680000;
                case 7:
                    return roomRate >= 5850000;
                case 8:
                    return roomRate >= 6020000;
                case 9:
                    return roomRate >= 6310000;
                case 10:
                    return roomRate >= 6590000;
            }
        }
        
        return false;
    }

    const validateBarPrice = (id: any, room: SiteMinderRoomModel[]) => {
        let newArray: SiteMinderRoomModel[]  = [];
        if (id === 1){
            newArray = [...supDoub];
            
        }
        else if (id === 2){
            newArray = [...supTwin]
            
        }
        else if (id === 3){
            newArray = [...dexDoub]
            
        }
        else if (id === 4){
            newArray = [...dexTwin]
           
        }
        else if (id === 5){
            newArray = [...supDexDoub];
            
        }
        else if (id === 6){
            newArray = [...supDexTwin];
           
        }  

        for (let index = 0; index < 14; index++){
            let priceValidation = validateBarPriceDetail(id, room[index].rate, room[index].barPrice);
            
            if (room[index].availability === 0)
                priceValidation = true;
            
            newArray[index] = { ...newArray[index], priceValidation: priceValidation};
        }

        if (id === 1){
            setSupDoub(newArray);
        }
        else if (id === 2){
            setSupTwin(newArray);
        }
        else if (id === 3){
            setDexDoub(newArray)
        }
        else if (id === 4){
            setDexTwin(newArray)
        }
        else if (id === 5){
            setSupDexDoub(newArray);
        }
        else if (id === 6){
            setSupDexTwin(newArray);
        }  
    }

    const updateBarPriceDetail = (id: any, room: SiteMinderRoomModel[]) => {
        let newArray: SiteMinderRoomModel[]  = [];

        if (id === 1){
            newArray = [...supDoub];
            
        }
        else if (id === 2){
            newArray = [...supTwin]
            
        }
        else if (id === 3){
            newArray = [...dexDoub]
            
        }
        else if (id === 4){
            newArray = [...dexTwin]
           
        }
        else if (id === 5){
            newArray = [...supDexDoub];
            
        }
        else if (id === 6){
            newArray = [...supDexTwin];
           
        }  

        for (let index = 0; index < 14; index++) {
            let barPrice = 0;
            
            if (room[index].season === "low"){
                if (room[index].occ < 20)
                    barPrice = 1
                else if (room[index].occ >= 20 && room[index].occ < 40)
                    barPrice = 2
                else if (room[index].occ >= 40 && room[index].occ < 60)
                    barPrice = 3
                else if (room[index].occ >= 60 && room[index].occ < 80)
                    barPrice = 4
                else if (room[index].occ >= 80)
                    barPrice = 5
            }
            else{
                if (room[index].occ < 20)
                    barPrice = 5
                else if (room[index].occ >= 20 && room[index].occ < 40)
                    barPrice = 6
                else if (room[index].occ >= 40 && room[index].occ < 60)
                    barPrice = 7
                else if (room[index].occ >= 60 && room[index].occ < 80)
                    barPrice = 8
                else if (room[index].occ >= 80)
                    barPrice = 9
            }
    
            
            
            newArray[index] = { ...newArray[index], barPrice: barPrice};
            
        }

        if (id === 1){
            setSupDoub(newArray);
        }
        else if (id === 2){
            setSupTwin(newArray);
        }
        else if (id === 3){
            setDexDoub(newArray)
        }
        else if (id === 4){
            setDexTwin(newArray)
        }
        else if (id === 5){
            setSupDexDoub(newArray);
        }
        else if (id === 6){
            setSupDexTwin(newArray);
        }  
    }

 

    const updateBarPrice = () => {
            updateBarPriceDetail(1, supDoub);
            updateBarPriceDetail(2, supTwin);
            updateBarPriceDetail(3, dexDoub);
            updateBarPriceDetail(4, dexTwin);
            updateBarPriceDetail(5, supDexDoub);
            updateBarPriceDetail(6, supDexTwin);
        
    }

    const updateBarValidation = () => {
        validateBarPrice(1, supDoub);
        validateBarPrice(2, supTwin);
        validateBarPrice(3, dexDoub);
        validateBarPrice(4, dexTwin);
        validateBarPrice(5, supDexDoub);
        validateBarPrice(6, supDexTwin);
    }

    const updateOcc= () => {
        
            // Create a copy of the array
            let newArray1 = [...supDoub];
            let newArray2 = [...supTwin];
            let newArray3 = [...dexDoub];
            let newArray4 = [...dexTwin];
            let newArray5 = [...supDexDoub];
            let newArray6 = [...supDexTwin];
            let newArray7 = [...luxury];
            let newArray8 = [...luxury2];
            let newArray9 = [...family];
            let newArray10 = [...family2];
            
            for (let index = 0; index < 14; index++){
                let occupancy = (48 - (newArray1[index].availability + newArray2[index].availability + newArray3[index].availability + newArray4[index].availability + newArray5[index].availability + newArray6[index].availability + newArray7[index].availability + newArray8[index].availability + newArray9[index].availability*2 + newArray10[index].availability*2))/48 * 100
            
            // Update the element at the given index
                newArray1[index] = { ...newArray1[index], occ: occupancy};
                newArray2[index] = { ...newArray2[index], occ: occupancy};
                newArray3[index] = { ...newArray3[index], occ: occupancy};
                newArray4[index] = { ...newArray4[index], occ: occupancy};
                newArray5[index] = { ...newArray5[index], occ: occupancy};
                newArray6[index] = { ...newArray6[index], occ: occupancy};
                newArray7[index] = { ...newArray7[index], occ: occupancy};
                newArray8[index] = { ...newArray8[index], occ: occupancy};
                newArray9[index] = { ...newArray9[index], occ: occupancy};
                newArray10[index] = { ...newArray10[index], occ: occupancy}; 

                
            }
            
            // newArray[index].occ = 1;
            setSupDoub(newArray1);
            setSupTwin(newArray2);
            setDexDoub(newArray3);
            setDexTwin(newArray4);
            setSupDexDoub(newArray5);
            setSupDexTwin(newArray6);
            setLuxury(newArray7);
            setLuxury2(newArray8);
            setFamily(newArray9);
            setFamily2(newArray10);

    }

    const updateSeason= () => {
          // Create a copy of the array
          let newArray1 = [...supDoub];
          let newArray2 = [...supTwin];
          let newArray3 = [...dexDoub];
          let newArray4 = [...dexTwin];
          let newArray5 = [...supDexDoub];
          let newArray6 = [...supDexTwin];
          let newArray7 = [...luxury];
          let newArray8 = [...luxury2];
          let newArray9 = [...family];
          let newArray10 = [...family2];
          
          for (let index = 0; index < 14; index++){
            //   let occupancy = (48 - (newArray1[index].availability + newArray2[index].availability + newArray3[index].availability + newArray4[index].availability + newArray5[index].availability + newArray6[index].availability + newArray7[index].availability + newArray8[index].availability + newArray9[index].availability*2 + newArray10[index].availability*2))/48 * 100
              let date = newArray1[index].date;
              let season = "low";
              if ( ((new Date(date)) >= (new Date('2025-01-02')) && (new Date(date)) <= (new Date('2025-04-28'))) ||  
                    ((new Date(date)) >= (new Date('2025-07-01')) && (new Date(date)) <= (new Date('2025-08-31'))) || 
                    ((new Date(date)) >= (new Date('2025-11-01')) && (new Date(date)) <= (new Date('2025-12-20'))) )
                season = "high"
          // Update the element at the given index
              newArray1[index] = { ...newArray1[index], season: season};
              newArray2[index] = { ...newArray2[index], season: season};
              newArray3[index] = { ...newArray3[index], season: season};
              newArray4[index] = { ...newArray4[index], season: season};
              newArray5[index] = { ...newArray5[index], season: season};
              newArray6[index] = { ...newArray6[index], season: season};
              newArray7[index] = { ...newArray7[index], season: season};
              newArray8[index] = { ...newArray8[index], season: season};
              newArray9[index] = { ...newArray9[index], season: season};
              newArray10[index] = { ...newArray10[index], season: season}; 

              
          }
          
          // newArray[index].occ = 1;
          setSupDoub(newArray1);
          setSupTwin(newArray2);
          setDexDoub(newArray3);
          setDexTwin(newArray4);
          setSupDexDoub(newArray5);
          setSupDexTwin(newArray6);
          setLuxury(newArray7);
          setLuxury2(newArray8);
          setFamily(newArray9);
          setFamily2(newArray10);
    }

    useEffect(() => {
        // LoadInventory();
      }, []);
    
    return (
        <ContentWrapper>
            <>
                <table>
                        <tr>
                        <th></th>
                        {
                            supDoub.map(item => (
                                    <TDDate>{item.date.toString()}</TDDate>
                            ))
                        } 
                        </tr>
                        {
                            roomArray.map(item => (
                            <tr>
                                <th style={{background: "rgb(209, 175, 166)"}}>
                                    {item.name}
                                </th>
                            {
                                (item.room).map(item => (   
                                <TDContent style = {{background: item.priceValidation ? 'rgb(161, 157, 226)' : 'rgb(230, 92, 58)'}}>
                                    <div>{item.rate}</div>
                                    <div>{item.occ.toFixed(1)}%</div>
                                    <div>{item.availability} rooms</div>
                                    <div>bar {item.barPrice}</div>
                                    <div>season: {item.season}</div>
                                    <div>{item.priceValidation.toString()}</div>
                                </TDContent>
                                ))
                            
                            }
                            </tr>
                            ))
                        }
                       
                </table>

                <Report>
                {   
                    report.map((item, index) => (
                        <div>
                          {item}  
                        </div>
                    ))
                
                }
                </Report>
                
            </>

            {/* <button onClick={LoadInventory}>
                Load Inventory
            </button> */}

            <form onSubmit={LoadInventory}>
                <div><label>Pick a date: </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => date && setSelectedDate(date)}
                    />
                </div>
                
                <div>
                <label>Cookies: </label> 
                    <input 
                        type="text" 
                        value={cookies}
                        onChange={(e) => setCookies(e.target.value)}
                        />
               
                </div>
                
                <FunctionButton type="submit">Load Inventory</FunctionButton>
                <FunctionButton onClick={updateOcc}>
                Update Occ
                </FunctionButton>
                <FunctionButton onClick={updateSeason}>
                Update Season
                </FunctionButton>
                <FunctionButton onClick={updateBarPrice}>
                    Update Bar Price
                </FunctionButton>
                <FunctionButton onClick={updateBarValidation}>
                Validate Price
                </FunctionButton>
                <FunctionButton onClick={generateReport}>
                    Generate Report
                </FunctionButton>
            </form>
        </ContentWrapper>
        
    )
}