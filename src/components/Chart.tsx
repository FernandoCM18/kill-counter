import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables
} from 'chart.js'
import { Chart, Bar } from 'react-chartjs-2';
import { GroupResponse, UsersKill } from '../interfaces/group';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
)

interface Props {
  data?: UsersKill[];
}

export const Charts = ({data}: Props) => {
  console.log(data);
  return (
    <Chart
      type="bar"
      data={{
        labels: data?.map(userKill => userKill.user.username),
        datasets: [{
            label: 'Total kills',
            data: data?.map(userKill => userKill.kills),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }}
      options={{
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Top Kills',
            font: {
              size: 20,
            }
          }
        }
        
      }}
      
    />
  )
}
