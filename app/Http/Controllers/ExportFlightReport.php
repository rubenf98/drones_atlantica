<?php

namespace App\Http\Controllers;

use App\Models\FlightReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExportFlightReport extends Controller
{

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(FlightReport $flightReport)
    {
        $phpWord = new \PhpOffice\PhpWord\PhpWord();

        $section = $phpWord->addSection();
        $phpWord->addTitleStyle(1, ["bold" => true, "size" => 18], []);
        $section->addTitle("Relatório de voo " . Carbon::parse($flightReport->date)->format('d-m-Y'));
        $section->addTextBreak();

        self::returnItem($section, "N.º registo de voo", $flightReport->serial_number);
        self::returnItem($section, "Data", Carbon::parse($flightReport->date)->format('d-m-Y'));
        self::returnItem($section, "Hora", Carbon::parse($flightReport->date)->format('H:m'));
        self::returnItem($section, "Marca", $flightReport->drone->manufacturer->name);
        self::returnItem($section, "Modelo", $flightReport->drone->project->name);
        self::returnItem($section, "N.º Série", $flightReport->drone->serial_number);
        self::returnItem($section, "Distrito", $flightReport->startLocalization->district);
        self::returnItem($section, "Concelho", $flightReport->startLocalization->conceil);
        self::returnItem($section, "Local de Partida", $flightReport->startLocalization->place);
        self::returnItem($section, "Latitude", $flightReport->startLocalization->latitude);
        self::returnItem($section, "Longitude", $flightReport->startLocalization->longitude);
        self::returnItem($section, "Local de Chegada", $flightReport->endLocalization->place);
        self::returnItem($section, "Latitude", $flightReport->endLocalization->latitude);
        self::returnItem($section, "Longitude", $flightReport->endLocalization->longitude);
        self::returnItem($section, "Condições metereológicas", $flightReport->condition->weather);
        self::returnItem($section, "Nome do piloto", $flightReport->operator->name);
        self::returnItem($section, "Autorização ANAC", "");
        self::returnItem($section, "Autorização AAN", "");
        self::returnItem($section, "Objetivo da missão", $flightReport->objective);
        self::returnItem($section, "Cliente", $flightReport->client);
        self::returnItem($section, "Plano de voo", $flightReport->plan);
        self::returnItem($section, "Pix4D nº", $flightReport->pix4d);
        self::returnItem($section, "Visibilidade", $flightReport->visibility);
        self::returnItem($section, "Distância máxima", $flightReport->max_distance);
        self::returnItem($section, "Altura máxima", $flightReport->max_altitude);
        self::returnItem($section, "Payload", $flightReport->payload);

        self::returnItem($section, "Descrição do voo", $flightReport->description);
        self::returnItem($section, "Verificações da aeronave antes do levantamento?", $flightReport->pre_verification ? "Sim." : "Não");
        $flightReport->pre_verification && $section->addText($flightReport->pre_verification, ["bold" => false, "size" => 12]);
        self::returnItem($section, "Verificação logo após o levantamento?", $flightReport->during_verification ? "Sim." : "Não");
        $flightReport->pre_verification && $section->addText($flightReport->during_verification, ["bold" => false, "size" => 12]);
        self::returnItem($section, "Verificação após aterragem?", $flightReport->post_verification ? "Sim." : "Não");
        $flightReport->pre_verification && $section->addText($flightReport->post_verification, ["bold" => false, "size" => 12]);
        self::returnItem($section, "Aeronaves nas proximidades?", $flightReport->nearby->aircrafts ? "Sim." : "Não");
        self::returnItem($section, "Quais?", $flightReport->nearby->aircrafts ? $flightReport->nearby->aircrafts : "N/A");
        self::returnItem($section, "Pessoas nas proximidades?", $flightReport->nearby->people ? "Sim." : "Não");
        self::returnItem($section, "Quantas?", $flightReport->nearby->people ? $flightReport->nearby->people : "N/A");
        self::returnItem($section, "Animais nas proximidades?", $flightReport->nearby->animals ? "Sim." : "Não");
        self::returnItem($section, "Quais e quantos?", $flightReport->nearby->animals ? $flightReport->nearby->animals : "N/A");
        self::returnItem($section, "Veículos próximos?", $flightReport->nearby->vehicles ? "Sim." : "Não");
        self::returnItem($section, "Quais?", $flightReport->nearby->vehicles ? $flightReport->nearby->vehicles : "N/A");
        self::returnItem($section, "Tipo de ligação para controlo", $flightReport->connection_type);
        self::returnItem($section, "Potência de transmissão", $flightReport->transmission_power);
        self::returnItem($section, "Condições de ligação/comunicação", $flightReport->condition->transmission);
        self::returnItem($section, "Condições de segurança", $flightReport->condition->safety);
        self::returnItem($section, "Dispositivos conectados", $flightReport->connected_devices);
        self::returnItem($section, "Duração do voo", $flightReport->flight_duration);

        $section->addPageBreak();
        self::returnItem($section, "Houve acidente?", $flightReport->crashReport ? "Sim" : "Não");
        self::returnItem($section, "Hora do despiste", $flightReport->crashReport ? Carbon::parse($flightReport->crashReport->date)->format('H:m') : "N/A");
        self::returnItem($section, "Latitude", $flightReport->crashReport ? $flightReport->crashReport->latitude : "N/A");
        self::returnItem($section, "Longitude", $flightReport->crashReport ? $flightReport->crashReport->longitude : "N/A");
        self::returnItem($section, "Danos ao equipamento", $flightReport->crashReport ? $flightReport->crashReport->damage : "N/A");
        self::returnItem($section, "Avaliação/Análise", $flightReport->crashReport ? $flightReport->crashReport->analysis : "N/A");
        self::returnItem($section, "Correções", $flightReport->crashReport ? $flightReport->crashReport->corrections : "N/A");

        $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');

        try {
            $objWriter->save(storage_path('flight_report_' . $flightReport->id . '.docx'));
        } catch (Exception $e) { }


        return response()->download(storage_path('flight_report_' . $flightReport->id . '.docx'));
    }

    protected static function returnItem($section, $label, $value)
    {
        $labelStyle = ["bold" => true, "size" => 12];
        $valueStyle = ["bold" => false, "size" => 12];

        $textrun = $section->addTextRun();
        $textrun->addText($label . ": ", $labelStyle);
        $textrun->addText($value, $valueStyle);
    }
}
