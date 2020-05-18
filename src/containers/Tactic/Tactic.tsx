import React, { useState } from 'react';
import classnames from 'classnames';
import ColorPicker from '../../components/UI/ColorPicker/ColorPicker';
import Field from '../../components/Field/Field';
import Squad from '../../components/Squad/Squad';
import { IPosition } from '../../constants/model';
import { GROUND } from '../../constants/constants';
import { generateData } from '../../helpers/player-generator';
import { capture, save, load } from '../../helpers/actions';
import { Card, Input, Button } from '../../style/VoetUI';
import './Tactic.scss';

const Tactic = () => {
    const [name, setName] = useState('Default');
    const [mainColor, setMainColor] = useState('#a32638');
    const [secondaryColor, setSecondaryColor] = useState('#fcb514');
    const [numberColor, setNumberColor] = useState('#ffffff');
    const [players, setPlayers] = useState(generateData());

    function editPlayer(id: string, nName: string, nNum: string, nPosition: IPosition) {
        setPlayers(
            players.map(player => {
                if (player.id === id) {
                    return {
                        name: nName !== null ? nName : player.name,
                        num: nNum !== null ? nNum : player.num,
                        id,
                        position: nPosition !== null ? nPosition : player.position,
                    };
                } else {
                    return player;
                }
            }),
        );
    }

    function downloadImage() {
        capture(document.getElementById('field'));
    }

    function saveTactic() {
        save(name, mainColor, secondaryColor, numberColor, players);
    }

    function loadTactic() {
        load(setName, setMainColor, setSecondaryColor, setNumberColor, setPlayers);
    }
    
    return (
        <div className="tactic">
            <div className="tactic__tactic-field">
                <Card customClass="tactic__field-wrapper">
                    <Field
                        width={GROUND.width}
                        height={GROUND.height}
                        players={players}
                        mainColor={mainColor}
                        secondaryColor={secondaryColor}
                        numberColor={numberColor}
                        id="field"
                    />
                    <div className="tactic__actions">
                        <Button
                            className={
                                classnames(
                                    'button',
                                    'button--success',
                                    'tactic__action-button',
                                    'tactic__action-button--save-image'
                                )
                            }
                            onClick={downloadImage}
                        >
                            Download as Image
                        </Button>
                        <Button
                            className={
                                classnames(
                                    'button',
                                    'button--warning',
                                    'tactic__action-button',
                                    'tactic__action-button--save-image'
                                )
                            }
                            onClick={saveTactic}
                        >
                            Save Tactic
                        </Button>
                        <Button
                            className={
                                classnames(
                                    'button',
                                    'button--danger',
                                    'tactic__action-button',
                                    'tactic__action-button--save-image'
                                )
                            }
                            onClick={loadTactic}
                        >
                            Load Tactic
                        </Button>
                    </div>
                </Card>
                <div className="tactic__options">
                    <div className="tactic__form-field">
                        <label className="tactic__label" htmlFor="tacticName">Tactic Name</label>
                        <Input className="tactic__input" id="tacticName" type="text" value={name} onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="tactic__color-options">
                        <div className="tactic__color-option">
                            <label className="tactic__label">Primary</label>
                            <ColorPicker color={mainColor} setColor={setMainColor} />
                        </div>
                        <div className="tactic__color-option">
                            <label className="tactic__label">Secondary</label>
                            <ColorPicker color={secondaryColor} setColor={setSecondaryColor} />
                        </div>
                        <div className="tactic__color-option">
                            <label className="tactic__label">Number</label>
                            <ColorPicker color={numberColor} setColor={setNumberColor} />
                        </div>
                    </div>
                    <Squad players={players} editPlayer={editPlayer} />
                </div>
            </div>
        </div>
    );
};

export default Tactic;
