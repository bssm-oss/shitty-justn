pub mod menu;
pub mod mode_select;
pub mod game;
pub mod result;

use ratatui::Frame;
use crate::app::{App, AppScreen};

pub fn render(app: &App, frame: &mut Frame) {
    match &app.screen {
        AppScreen::MainMenu => menu::render(app, frame),
        AppScreen::CategorySelect => mode_select::render_category_select(app, frame),
        AppScreen::Playing => game::render(app, frame),
        AppScreen::Result(result) => result::render(result, frame),
        AppScreen::Quitting => {}
    }
}
