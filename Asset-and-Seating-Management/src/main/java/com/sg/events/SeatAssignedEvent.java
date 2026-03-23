package com.sg.events;

public record SeatAssignedEvent(
        Long seatId,
        Long employeeId
) {}