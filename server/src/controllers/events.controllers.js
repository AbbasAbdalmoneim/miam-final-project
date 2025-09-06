import Event from "../models/event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      throw new Error("id is missing!!");
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const createSeatsMap = (capacity) => {
  const cols = Math.ceil(Math.sqrt(capacity * 1.2));
  const rows = Math.ceil(capacity / cols);
  const seatsMap = [];
  let remainingSeats = capacity;
  for (let row = 0; row < rows; row++) {
    const seatsInThisRow = Math.min(cols, remainingSeats);
    const rowArray = Array(seatsInThisRow).fill(0);
    seatsMap.push(rowArray);
    remainingSeats -= seatsInThisRow;
    if (remainingSeats <= 0) break;
  }
  console.log(seatsMap);
  return seatsMap;
};

export const createEvent = async (req, res) => {
  try {
    const payload = req.body;
    const totalSeats = payload.venue.capacity;
    const seatsMap = createSeatsMap(totalSeats);
    const seatsAmount = totalSeats;
    const availableSeats = totalSeats;
    const initialRevenue = 0;

    const event = new Event({
      ...payload,
      seatsMap,
      seatsAmount,
      availableSeats,
      revenue: initialRevenue,
    });
    await event.save();

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    if (
      event.organizer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event",
      });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }


    if (
      event.organizer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event",
      });
    }

    await event.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
