import Event from "../models/event.js";
import Ticket from "../models/ticket.js";


export const buyTickets = async (req, res) => {
  try {

    const payload = req.body;

    const eventId = payload.event;
    const newSeatsMap = payload.seats;
    const availableSeats = payload.quantity;
    const updatedRevenue = payload.price;

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: { revenue: updatedRevenue },
        availableSeats,
        seatsMap: newSeatsMap,
      },
      { new: true }
    );

    console.log(event);


    const { user, ticketType, seatsNumber, price, quantity, paymentDetails } =
      payload;
    const ticket = new Ticket({
      event: eventId,
      user,
      ticketType,
      seatsNumber,
      price,
      quantity,
      paymentDetails,
    });

    await ticket.save();

    console.log(ticket);

    res.status(201).json({
      data: ticket,
      success: true,
      message: "ticket checkout completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};
export const getTicketsByEventId = async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    res.status(201).json({
      data: "buyTickets",
      success: true,
      message: "ticket checkout completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};
export const getUserTickets = async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = req.params;

    console.log(payload);

    console.log(userId);

    const tickets = await Ticket.find({ user: userId });

    res.status(200).json({
      data: tickets,
      success: true,
      message: "get user tickets completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};

