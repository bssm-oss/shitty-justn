use std::time::Duration;
use crossterm::event::{self, Event};

/// Poll for a crossterm event with a given timeout.
/// Returns None if no event is available within the timeout.
pub fn poll_event(timeout: Duration) -> anyhow::Result<Option<Event>> {
    if event::poll(timeout)? {
        Ok(Some(event::read()?))
    } else {
        Ok(None)
    }
}
