import React, { Component } from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Moment from 'react-moment';
import 'moment/locale/de';

class AppointmentsList extends Component {
	render() {
		const { appointments } = this.props;
		const myAppointments = appointments.map((item) => {
        const date = new Date(item.aptDateTime.seconds*1000);
			return (
        <TableRow key={item.id}>					
          <TableCell align="left">{item.thema}</TableCell>
          <TableCell align="left">{item.institution}</TableCell>
          
          <TableCell align="left">{date.getDate()}. {date.getMonth()+1}. {date.getFullYear()} {date.getHours()}:{date.getMinutes()} </TableCell>
         <TableCell align="left">
            <Moment format="DD.MM.YYYY hh:mm">{date}</Moment>
          </TableCell> 
          <TableCell align="left">
            <Button 
              title="Termin bearbeiten"
              onClick={e=>this.props.editAppointment(e, item)}>
				  	  <EditOutlinedIcon style={{ fill: '#009444' }}/>
			  	  </Button>	
          </TableCell>
        <TableCell align="left">
            <Button 
              title="Termin löschen"
              onClick={e=>this.props.handleDelete(item.id)}>
					<DeleteOutlineIcon style={{ fill: '#F15A24' }} />
				</Button>	</TableCell>
        </TableRow>
			);
    });
    return myAppointments;
    
	}
}

export default AppointmentsList;
